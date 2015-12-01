set NODE_ENV=development
node app


rem sc create hfs binPath = "C:\Program Files\nodejs\node.exe E:\project\hfs\app.js" DisplayName = "hfs 上传文件" start = auto type = share depend = RpcSs/EventSystem
