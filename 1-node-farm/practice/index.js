// const hello = "hello world"
// console.log(hello);

const fs = require('fs') // core modules
//Synchronously reads the entire contents of a file.
const text = fs.readFileSync('/home/ubuntu/repos/React/LearningNode/complete-node-bootcamp/1-node-farm/starter/txt/input.txt', 'utf-8')
// console.log(text)
const out = `This is about avocado : ${text} \n Created on ${Date.now()}`;
fs.writeFileSync('/home/ubuntu/repos/React/LearningNode/complete-node-bootcamp/1-node-farm/starter/txt/output.txt', out);
console.log("file written")

//async
fs.readFile('/home/ubuntu/repos/React/LearningNode/complete-node-bootcamp/1-node-farm/starter/txt/start.txt', 'utf-8', (err, data) => {
    fs.readFile(`/home/ubuntu/repos/React/LearningNode/complete-node-bootcamp/1-node-farm/starter/txt/${data}.txt`, 'utf-8', (err, data1) => {
        fs.readFile('/home/ubuntu/repos/React/LearningNode/complete-node-bootcamp/1-node-farm/starter/txt/append.txt', 'utf-8', (err, data2) => {
            fs.writeFile('/home/ubuntu/repos/React/LearningNode/complete-node-bootcamp/1-node-farm/starter/txt/result.txt', `${data1} \n ${data2}`, 'utf-8', err => {
                console.log("Contents written")
                if (err)
                    return console.log("Error finding file")
            })
        })
    })
})
console.log('File will be read now')

