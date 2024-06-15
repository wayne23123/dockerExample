
如何添加 volume 到 容器中

VOLUME [ "<容器內的路徑>" ]

VOLUME [ "/app/feedback" ]

議題：如何控制將此映射到託管的計算機上的哪個文件夾
-> 之後討論

dodker build -t feedback-node:volumes .

docker ps

docker stop testfeedback-app

docker rm testfeedback-app

docker run -d -p 3000:80 --rm --name testfeedback-app feed-back-node:volumes

報錯了

docker logs testfeedback-app

問題在

await fs.rename(tempFilePath, finalFilePath);
// .rename 方法 如果文件跨多個設備移動，則重命名方法將不起作用

Docker 實際上不會將文件移動到容器文件系統內的其他文件夾中

而是將其移動到容器之外

docker rmi feedback-node:volumes

dodker build -t feedback-node:volumes .

docker run -d -p 3000:80 --rm --name testfeedback-app feed-back-node:volumes

docker stop feedback-app

docker run -d -p 3000:80 --rm --name testfeedback-app feed-back-node:volumes






