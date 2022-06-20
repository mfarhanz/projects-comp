from django.shortcuts import render
from django.http import HttpResponse
import requests

reserved_urls = [   'https://mun.ca','https://my.mun.ca','https://online.mun.ca','https://selfservice.mun.ca',
                    'https://crm.stuaff.mun.ca','https://letseat.mun.ca']

status_message = {
               100: "Website is slow to respond, but appears ok.",
               101: "Server is upgrading to the requested protocol.",
               102: "Request received, website has yet to respond.",
               103: "Early hints, returns response header preview before the rest "
                    "of the server's response is ready.",
               200: "Website is online.",
               201: "The request has succeeded and a new resource has been created.",
               202: "The request has been received but not yet acted upon.",
               203: "Website returned meta-information from a copy of the server.",
               204: "There is no content to send for this request.",
               205: "Reset document view which sent this request.",
               206: "Separate download into multiple streams.",
               207: "Website returned XML which could contain multiple status codes.",
               208: "Website issued multiple responses.",
               226: "Website returned a GET response.",
               300: "Website has different choices and cannot be resolved into one.",
               301: "Website has been redirected permanently.",
               302: "Website has been redirected temporarily.",
               303: "Website sent this response to direct the client to get the "
                    "requested resource at another URI.",
               304: "Website cache has not been modified.",
               305: "Website requested response must be accessed by a proxy.",
               306: "Unused status code, held for upcoming purpose",
               307: "Website has been redirected temporarily.",
               308: "Website has been redirected permanently.",
               400: "The request could not be understood by the server due to "
                    "malformed syntax.",
               401: "The request requires user authentication",
               402: "Website requires payment before serving responses.",
               403: "Forbidden. The server understood the request, but is refusing "
                    "to fulfill it.",
               404: "Website not found!",
               405: "The request method is known by the server but has been "
                    "disabled and cannot be used.",
               406: "No Content found!",
               407: "Website requires 3rd party authentication.",
               408: "Website request Timed out.",
               409: "Server conflict, please try again.",
               410: "Requested content has been permanently deleted from server.",
               411: 'Website rejected the request because the Content-Length header '
                    'field is not defined.',
               412: "Website doesn't meet client preconditions.",
               413: "Request entity is larger than limits defined by server.",
               414: "The URI requested by the client is too long.",
               415: "The media format of the requested data is not supported by the "
                    "server.",
               416: "The range specified by the Range header field in the request "
                    "can't be fulfilled by the website.",
               417: "Data indicated by the Expect request header field can't be met "
                    "by the server.",
               418: "The server refuses the attempt to brew coffee with a teapot.",
               421: "Website redirection failed.",
               422: "The request failed due to semantic errors.",
               423: "The resource that is being accessed is locked.",
               424: "The request failed due to failure of a previous request.",
               426: "The server refuses to perform the request using the current "
                    "protocol.",
               428: "Data update conflict.",
               429: "Website refused due to too many requests, please try again "
                    "later.",
               431: "Request refused due to large size headers.",
               451: "Request refused due to legal reasons.",
               500: "Website is experiencing errors.",
               501: "Unsupported request.",
               502: "Website Gateway error.",
               503: "The web server is unable to handle your HTTP request at the "
                    "time.",
               504: "Gateway Timeout.",
               505: "HTTP Version Not Supported.",
               506: "The server has an internal configuration error.",
               507: "The server is out of space.",
               508: "The server went to infinity and beyond, but could not return "
                    "your request.",
               510: "Further extensions to the request are required for the server "
                    "to fulfill it.",
               511: "Network Authentication Required.",
               999: 'Failed to connect.'
               }

def default_check(request):
     codes = []
     for x in reserved_urls:
          try:
               r = requests.get(x)
               codes.append(r.status_code)
               index = str(reserved_urls.index(x))
               print(x)
               print(codes)
               if len(codes) == 6:
                    return render(
                    request,
                    'site_status_checker/mun_status.html',
                    { 
                         'status'+str(reserved_urls.index(i)) : status_message[codes[reserved_urls.index(i)]] for i in reserved_urls
                    }
                    )
          except requests.ConnectionError:
               codes.append(999)
               print(reserved_urls.index(x))
               print(codes)
          finally:
               pass

def get_code(code):
     return status_message[code]

def check_url(request, url):
    # This function uses status codes to check various states of any website
    # modified to only return the status code
    # It also checks if the website belongs to MUN, thereby assigning the correct 
    # top level domain
     if(url == 'favicon.ico'):
          return HttpResponse('')
     log = ""
     codes = []
     status_code = 999
     if url in ["mun", "my.mun", "online.mun", "selfservice.mun", "crm.stuaff.mun", "letseat.mun"]:
         urls = ['https://'+ url + '.ca']
     else:
         urls = [   'https://'+ url + '.com', 'https://'+ url + '.org', 'https://'+ url + '.ca',
                    'https://'+ url + '.net', 'https://'+ url + '.edu', 'https://'+ url + '.gov', 
                    'https://'+ url + '.uk']
     for x in urls:
          try:
               r = requests.get(x)
               codes.append(r.status_code)
               status_code = [code for code in codes if code!=999][0]
               print(x)
               print(status_code)
               print(codes)
               if status_code in range(100,300):
                    return render(
                    request,
                    'site_status_checker/site_status.html',
                    {
                         'log': log,
                         'url': x,
                         'status': status_message[status_code]
                    }
                    )
          except requests.ConnectionError:
               print('Failed, trying next TLD ...')
               log += 'Site status for '+x+' : '+status_message[status_code]+'  \n'
          else:
               log += 'Site status for '+x+' : '+status_message[status_code]+'   \n'
          finally:
               if x == urls[-1] and status_code != 200:
                    return render(
                    request,
                    'site_status_checker/site_status.html',
                    {
                         'log': log,
                         'url': url,
                         'status': status_message[404]
                    }
                    )
