export const capitalLetter = (str)=>{
    return str.slice(0,1).toUpperCase() + str.slice(1).toLowerCase()
}

export const sortOptions = {
    'ID': (a, b)=>{
        return a.id-b.id
    },
    'AZ': (a, b)=>{
        return a.name.localeCompare(b.name)
    },
    'ZA':(a, b)=>{
        return b.name.localeCompare(a.name)
    },
    'AA':(a, b)=>{
        return a.stats.Attack-b.stats.Attack
    },
    'AD':(a, b)=>{
        return b.stats.Attack-a.stats.Attack
    }
};   

export const isValidHttpUrl = (string)=>{
    let url;
    
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
  
    return url.protocol === "http:" || url.protocol === "https:";
  }