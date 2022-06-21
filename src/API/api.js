import * as axios from "axios";
let uuidgen = Math.random().toString(16).slice(2)

const instance = axios.create({
    headers: {
        Authorization: "Bearer d4b78fabbd9b87dc83bf5aae7a55e94cfaa716c0",
        "Content-Type": "application/json",
        "X-Request-Id": uuidgen
    },
    baseURL: 'https://api.todoist.com/rest/v1/'
})

const instanceSYNC = axios.create({
    headers: {
        Authorization: "Bearer d4b78fabbd9b87dc83bf5aae7a55e94cfaa716c0"
    },
    baseURL: 'https://api.todoist.com/sync/v8/'
})

export const todoAPI = {
    getTasks(setItems){
        return instance.get(`tasks`).then(res=> {
            setItems(res.data)
        })
    },
    addTask(newTask, setItems, items){
        return instance.post(`tasks`, newTask).then(res=>setItems([...items, res.data]))
    },
    deleteTask(id, setItems){
        return instance.delete(`tasks/${id}`).then(res=>instance.get(`tasks`).then(res=> {setItems(res.data)}))
    },
    doneTask(item, setItems){
        return instance.post(`tasks/${item.id}`, {priority: item.priority===1?2:1}).then(res=>
            instance.get(`tasks`).then(res=> {setItems(res.data)}))
    },
    showCompleted(setCompletedTD){
        return instanceSYNC.get(`completed/get_all`).then(res=>{setCompletedTD(res.data.items)})
    },
    reComplete(item, setItems, setCompletedTD){
        return instance.post(`tasks/${item.task_id}/reopen`, {}).then(res=>{
            instance.get(`tasks`).then(res=> {setItems(res.data)})
            instanceSYNC.get(`completed/get_all`).then(res=>{setCompletedTD(res.data.items)})
        })
    },
    complete(id, setItems, setCompletedTD){
        return instance.post(`tasks/${id}/close`, {}).then(res=>{
            instance.get(`tasks`).then(res=> {setItems(res.data)})
            instanceSYNC.get(`completed/get_all`).then(res=>{setCompletedTD(res.data.items)})
        })
    },
}
