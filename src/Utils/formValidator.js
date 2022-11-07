export const formValidator = ({name, value}) => {
    if(value !== '') {
    
        if(name === 'password') {
  
          if(value.length < 5) {
            setErrors(prev => {return {...prev, [name]: `Password needs min of 5 characters`}});
          } else {
            setErrors(prev => {return {...prev, [name]: null}});
          };
  
        }else if (name === 'firstName') {

          if(value.length < 3) {
              setErrors(prev => {return {...prev, [name]: `Please first name should be a minimum of 3 characters`}});
            } else {
              setErrors(prev => {return {...prev, [name]: null}});
          };

        } else {
          setErrors(prev => {return {...prev, [name]: null}});
        };
        
      } else {
        setErrors(prev => {return {...prev, [name]: `This field is required`}});
      };
}