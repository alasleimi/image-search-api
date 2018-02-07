Image Search Abstraction Layer - [freecodecamp](https://www.freecodecamp.org/challenges/image-search-abstraction-layer)
=========================

an image search api for freecodecamp Backend projects. Uses Google custom search api through [google-images](https://github.com/vadimdemedes/google-images).



Usage
------------

# search

example:  https://image-api.glitch.me/search/HelloWorld?offset=2

## input 

```
GET https://image-api.glitch.me/search/:searchTerm[?offset=page_number]
```
* **searchTerm:** the term to search for.
* **offset:** the page number. optional. default is 1. Error code 400 is returned if not an integer.



## output

```JSON
[
{
"url": image url,
"snippet": description,
"thumbnail": thumbnail url,
"context": url of the original page
},
.
.
.
]
```


# history



GET [https://image-api.glitch.me/history](https://image-api.glitch.me/history)




## output

history of recent search terms

 ```JSON
 [{ "term": search term,
    "when": date in ISO 8601 extended format
  },
  {"term":"helloWorld",
    "when":"2018-02-07T20:20:13.379Z"
  },
  .
  .
  .  
  ]
  ```



