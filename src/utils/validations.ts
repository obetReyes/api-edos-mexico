import * as yup from 'yup';


const authSchema = yup.object({
    email: yup.string().required('el email es necesario').min(3, "el email es muy corto").max(240, 'el email no puede contener mas de 240 caracteres').email('el email no es valido'),
    password: yup.string().required('la contraseña es  necesaria').min(6, 'la contraseña no puede ser tan corta').max(40, 'la contraseña no puede ser tan extensa').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, "la contraseña debe tener 6 caracteres con numeros y letras"
    ),
  });
  
export default authSchema