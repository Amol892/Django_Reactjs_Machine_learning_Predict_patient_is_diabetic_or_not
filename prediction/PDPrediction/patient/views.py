import pickle
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import render
import numpy as np
from django.core.cache import cache
import warnings
warnings.filterwarnings("ignore", category=UserWarning)


# load picked data

def load_large_data():
    data = cache.get('model_file')
    
    if data is not None:
        print('data is not None')
        return data
    
    # if not in cache load the data from pickle file
    model_path = 'ML_Model/model.pkl'
    with open(model_path, 'rb') as fh:
        data = pickle.load(fh)
    
    # store the data in cache 
    cache.set('model_file',data, timeout=None)
    print('Data is None')
    return data



@api_view(["POST"])
def predict_diabetic(request):
    try:
        Pregnancies = request.data.get('Pregnancies',None)
        Glucose = request.data.get('Glucose',None)
        BloodPressure = request.data.get('BloodPressure',None)
        SkinThickness = request.data.get('SkinThickness',None)
        Insulin = request.data.get('Insulin',None)
        BMI = request.data.get('BMI',None)
        DiabetesPedigreeFunction = request.data.get('DiabetesPedigreeFunction',None)
        Age = request.data.get('Age',None)
        fields = [Pregnancies,Glucose,BloodPressure,SkinThickness,Insulin,BMI,DiabetesPedigreeFunction,Age]
        if not None in fields:
            #Datapreprocessing Convert the values to float
            Pregnancies = float(Pregnancies)
            Glucose = float(Glucose)
            BloodPressure = float(BloodPressure)
            SkinThickness = float(SkinThickness)
            Insulin = float(Insulin)
            BMI = float(BMI)
            DiabetesPedigreeFunction = float(DiabetesPedigreeFunction)
            Age = float(Age)
            result = [Pregnancies,Glucose,BloodPressure,SkinThickness,Insulin,BMI,DiabetesPedigreeFunction,Age]
            #Passing data to model & loading the model from disks
            
            classifier = load_large_data()
            prediction = classifier.predict([result])[0]
            conf_score =  np.max(classifier.predict_proba([result]))*100
            data = {
                'error' : '0',
                'message' : 'Successfull',
                'prediction' : prediction,
                'confidence_score' : conf_score
            }
        else:
            data = {
                'error' : '1',
                'message': 'Invalid Parameters'                
            }
    except Exception as e:
        data = {
            'error' : '2',
            "message": str(e)
        }
    
    return Response(data)
