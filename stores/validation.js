//DataCreate Api Start
export const validate = () => {

    function validation(list) {

        list.forEach(function(value, index) {
            console.log('array index: ' + index + ' value : ' + value);
          });
           
    
        /* if (memberList.value.name == '') {
          alert("Insert your name");
          return false;
        } */
        
        return true;
      
      }
    
    return { validation }
};
//DataCreate Api End