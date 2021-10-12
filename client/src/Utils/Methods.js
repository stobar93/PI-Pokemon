export const capitalLetter = (str)=>{
    return str.slice(0,1).toUpperCase() + str.slice(1).toLowerCase()
}

export const sortOptions = {
    'ID': (a, b)=>{
        let A = a.id.toString().slice(-3)
        let B = b.id.toString().slice(-3)
        
        if(A==='-DB' && B==='-DB' ){
          return a.id.toString().slice(0,-3)-b.id.toString().slice(0,-3)
        }
        else if(A==='-DB' && B!=='-DB' ){ return -1 }
        else if(A!=='-DB' && B==='-DB' ){ return 1 }
        else{ return a.id-b.id }
          
      },
      'IDd': (a, b)=>{
        let A = a.id.toString().slice(-3)
        let B = b.id.toString().slice(-3)
        
        if(A==='-DB' && B==='-DB' ){
          return b.id.toString().slice(0,-3)-a.id.toString().slice(0,-3)
        } else if(A==='-DB' && B!=='-DB' ){
          return -1
        } else if(A!=='-DB' && B==='-DB' ){
          return 1
        }else{
          return b.id-a.id
        }
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