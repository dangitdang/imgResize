# PubPub Image Resize Service


### Purpose

The service takes in an image url and a desired size. It will resize the image, convert it to .jpg file and upload the image to S3. The response is the URL to the resized image.

### Usage

``` 
POST /[w]x[h]
```
#### Parameters
w : width 
h : height

#### Arguments
url : the image's URL


#### Example

Request
```
curl localhost:3000/256x256 \
	-d '{
	"url" : "http://web.mit.edu/someimage.png"
	}'
```

Response
```
{'URL' : 'yourbucket.s3.amazonaws.com/256526someimage.png'}
```

### Installation

```
npm install
```

You need to set up 3 env variables
```
export THUMBNAILS_BUCKET='your bucketnam'
export AWS_ACCESS_KEY_ID='aws ID'
export AWS_SECRET_KEY_ID='aws KEY'
```

To run 

```
npm start
```


