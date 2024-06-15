

docker build -t feedBackNode:latest .

docker run -p 3000:80 -d --name feedBackApp --rm feedBackNode

http://localhost:3000/





docker run -p 3000:80 -d --rm e8fdd869808f4bdbcd8ca127295b44fe1dc97a6286fad0f95a858eb2be75ae7d
