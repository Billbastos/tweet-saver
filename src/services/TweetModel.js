

export const model = (id, img, name, screenName, date, message) => {
    return {
            id: id, 
            img: img,
            name: name,
            screenName: screenName,
            date: date,
            message: message
        }
}

export const columns = (id, tasks) => {
    return {
        id: id,
        taskIds: tasks
    }
}