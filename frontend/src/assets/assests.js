import medtype1 from './antibiotix.png';
import medtype2 from './Antifungal medicines.png';
import medtype3 from './antiviral.png';
import medtype4 from './Cardiovascular drugs.png';  
import medtype5 from './Gastrointestinal dru.png';
import medtype6 from './painrelif.png';
import medtype7 from './peracetamol.png';
import medtype8 from './Respiratory drugs il.png';
import medtype9 from './antihistamines.png';
import med1 from './paracetamol500mg.jpg';
import med2 from './ibuprofen200mg.jpg';
import med3 from './aspirin300mg.jpg';  
import med4 from './cetirizine-10mg.avif';
import med5 from './loratadine10mg.webp';
import med6 from './omeprazole-40mg.jpg';
import med7 from './Pantoprazole.jpg';
import med8 from './metformin.webp';
import med9 from './Insulin.webp';
import med10 from './amoxicillin.jpg';
import med11 from './azithromycin.webp';
import med12 from './ors tetra.jpg';



export const medtype_list = [
    {
        medtype_name:"Antibiotics",
        medtype_img:medtype1
    },
    {
        medtype_name:"Antifungal medicines",
        medtype_img:medtype2    

    },
    {
        medtype_name:"Antiviral",
        medtype_img:medtype3
    },
    {
        medtype_name:"Cardiovascular drugs",
        medtype_img:medtype4    
    },
    {
        medtype_name:"Gastrointestinal drugs",
        medtype_img:medtype5
    },
    {
        medtype_name:"Pain relief",
        medtype_img:medtype6
    },
    {
        medtype_name:"Peracetamol",
        medtype_img:medtype7
    },
    {
        medtype_name:"Respiratory drugs",
        medtype_img:medtype8
    },
    {
        medtype_name:"Antihistamines",
        medtype_img:medtype9
    }
]

export const med_list = [
{
    _id:"1",
    name:"Paracetamol 500mg",
    image:med1,
    price: 10,
    description:"fever, headache, body pain",
    medtype:"Peracetamol",
},
{
    _id:"2",
    name:"Ibuprofen 200mg",
    image:med2, 
    price: 15, 
    description:"pain, inflammation, fever",
    medtype:"Pain relief",
},
{
    _id:"3",
    name:"Aspirin 300mg",
    image:med3,
    price: 20,
    description:"pain, fever, heart protection",
    medtype:"Pain relief",
},
{
    _id:"4",
    name:"Cetirizine 10mg",
    image:med4,
    price: 12,
    description:"allergy, sneezing, itching",
    medtype:"Antihistamines",
},
{
    _id:"5",
    name:"Loratadine 10mg",
    image:med5, 
    price: 14,
    description:"allergy, hay fever, urticaria,seasonal allergies",
    medtype:"Antihistamines",
},
{
    _id:"6",
    name:"Omeprazole 40mg",
    image:med6,
    price: 18,
    description:"acidity, GERD, stomach ulcers",
    medtype:"Gastrointestinal drugs",

},
{
    _id:"7",
    name:"Pantoprazole 40mg",
    image:med7,
    price: 22,
    description:"acid reflux, GERD, stomach ulcers",
    medtype:"Gastrointestinal drugs",
},
{
    _id:"8",
    name:"Metformin 500mg",
    image:med8,
    price: 25,
    description:"type 2 diabetes, blood sugar control",
    medtype:"Antidiabetic drugs",
},
{
    _id:"9",
    name:"Insulin",
    image:med9,
    price: 30,
    description:"type 1 diabetes, blood sugar control",
    medtype:"Antidiabetic drugs",
},
{
    _id:"10",
    name:"Amoxicillin 500mg",
    image:med10,
    price: 18,
    description:"bacterial infections, respiratory infections, urinary tract infections",
    medtype:"Antibiotics",
},
{
    _id:"11",
    name:"Azithromycin 250mg",
    image:med11,
    price: 20,
    description:"bacterial infections, throat infection, chest infections, skin infections",
    medtype:"Antibiotics",
},
{
    _id:"12",
    name:"ORS Tetra",
    image:med12,
    price: 8,
    description:"dehydration, diarrhea, electrolyte imbalance,vomiting",
    medtype:"Gastrointestinal drugs",
}

]