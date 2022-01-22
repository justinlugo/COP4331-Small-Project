// We can seperate js files into "components", very similar to Java with classes.
const url = "http://cop4331small.xyz";
const ext = "php";

export const newUser = (data) => {
    // packaging the data from the form.
    const myJSON = JSON.stringify(data);
    console.log(myJSON);
    


    console.log("New user submitted.");
}

export const login = (data) => {
    const myJSON = JSON.stringify(data);
    console.log(myJSON);



    console.log("Login attempt.");
}