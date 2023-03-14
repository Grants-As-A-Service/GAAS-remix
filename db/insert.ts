import tagnames from "./mockData/tagnames.json";

const insertTagNames = (): Array<Tag> => {
    return tagnames.map(name => {
        return {
            name: name,
            
        }
    })
};
