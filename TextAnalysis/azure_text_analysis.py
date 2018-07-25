import requests
'''
apim key - 4f29606922a94ff0b71dcef2d5aa74f2

'''

def get_keywords(text):
	r = requests.post('http://httpbin.org/post', data = {'key':'value'})
	