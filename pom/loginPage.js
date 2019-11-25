const { By,Key } = require('selenium-webdriver');

class LoginPage {
    constructor(driver) {        
        this.driver = driver;
    }

    async goTo() {
        await this.driver.get('https://mail.google.com/');
    }

    async writeEmail(_email){
        await this.driver.findElement(By.id("identifierId")).sendKeys(_email);
    }

    async writePassword(_pass){
        await this.driver.findElement(By.name("password")).sendKeys(_pass);
    }

    async clickOnElementById(_id){
        await this.driver.findElement(By.id(_id)).click();
    }

    async wrongPassword(){
        var result;
        var message = "Contraseña incorrecta. Vuelve a intentarlo o haz clic en Contraseña olvidada para cambiarla."
        try{
        await this.driver.findElement(By.xpath("//*[text()='"+message+"']"));
        result = true;
        }catch(e){
            //console.log("ERROR!: "+e);
            result = false;
        }
        return result;
    }

    
}

module.exports = LoginPage;