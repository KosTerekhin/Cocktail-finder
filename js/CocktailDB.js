let dataArr;

class STORAGE {
    setData(id){
        cocktail.favouritesArray(id).then((data) =>{
            dataArr.push(data); 
            localStorage.setItem('favourites', JSON.stringify(dataArr))
        })
    }

    getData(){

        if(JSON.parse(localStorage.getItem('favourites')) === null){
            const empty = [];
            return empty;
        } else {
            const data = JSON.parse(localStorage.getItem('favourites'))
            return data;
        }; 
    }

    removeData(id){
        if(JSON.parse(localStorage.getItem('favourites')) === null){
            return

        } else {
            const data = JSON.parse(localStorage.getItem('favourites'))
            data.forEach((item,index) => {
                if(item.idDrink == id){
                    data.splice(index, 1);
                    dataArr = data;
                    localStorage.setItem('favourites', JSON.stringify(dataArr));                    
                    ui.displayFAVS();
                }
            })
        }; 
    }
    removeFromStorage(id){
        if(JSON.parse(localStorage.getItem('favourites')) === null){
            return

        } else {
            const data = JSON.parse(localStorage.getItem('favourites'))
            data.forEach((item,index) => {
                if(item.idDrink == id){
                    data.splice(index, 1);
                    dataArr = data;
                    localStorage.setItem('favourites', JSON.stringify(dataArr));   
                }
            })
        }; 
    };

    updateStorage(){
        if(JSON.parse(localStorage.getItem('favourites')) === null){
            dataArr = [];
        } 
        else {
            const data = JSON.parse(localStorage.getItem('favourites'))
            dataArr = data;  
        };
    }; 
}



