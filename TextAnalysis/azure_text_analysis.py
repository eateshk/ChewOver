import requests
'''
apim key - 4f29606922a94ff0b71dcef2d5aa74f2

'''
url = "https://eastasia.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases"
headers = {
		"Ocp-Apim-Subscription-Key":"fb979fc6b0e54a59ade696a36dceaaa7",
		"Content-Type":"application/json",
		"Accept":"application/json"
}

test_data = {"documents" : [
		{
	        "language": "en",
            "id": "1",
            "text": "We love this trail and make the trip every year. The views are breathtaking and well worth the hike!"
		},
	]
	}

def get_keywords(text):
	# prepare data
	res = requests.post(url, data = json.dumps(test_data), headers = headers);

def evaluate_index(o):
	input_list = []
	try :
		for i in range(len(o)):
			if(i.type == "poll"){
				input_list.append({
					"id": i+1,
					"text" : i.title,
					"language" : "en"
					});
			}
			elif(i.type == "comment"){
				

			}
	except :
		"some error while parsing object o"
