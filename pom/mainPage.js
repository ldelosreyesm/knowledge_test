const { By,Key, until } = require('selenium-webdriver');
var hashString;
class MainPage {
    constructor(driver) {        
        this.driver = driver;

        this.randomString = function(len, an){
            an = an&&an.toLowerCase();
            var str="", i=0, min=an=="a"?10:0, max=an=="n"?10:62;
            for(;i++<len;){
              var r = Math.random()*(max-min)+min <<0;
              str += String.fromCharCode(r+=r>9?r<36?55:61:48);
            }
            return str;
        }

        this.sleep = function(milliseconds) {
            var start = new Date().getTime();
            for (var i = 0; i < 1e7; i++) {
                if ((new Date().getTime() - start) > milliseconds){
                    break;
                }
            }
        }
    }
    async goTo() {
        await this.driver.get('https://mail.google.com/mail/u/0/h/1pq68r75kzvdr/?v%3Dlui');
    }

    async makeClickOnCompose(){
        await this.driver.findElement(By.xpath("//div[@role='button' and text()='Redactar']")).click();
    }

    async fillSubjectField(){
        await this.driver.findElement(By.name("subjectbox")).sendKeys("Automation test");
    }

    async fillToField(){
        await this.driver.findElement(By.xpath("//textarea[@name='to']")).sendKeys("luis.delosreyes01@gmail.com");
    }

    async fillToFieldWithValue(_value){
        await this.driver.findElement(By.xpath("//textarea[@name='to']")).sendKeys(_value);
    }

    async fillSubjectFieldRamdom(){
        hashString = this.randomString(10, "A");
        await this.driver.findElement(By.name("subjectbox")).sendKeys(hashString);
    }

    async clickOnElementById(_id){
        await this.driver.findElement(By.id(_id)).click();
    }

    async activateCCfield(){
        this.driver.findElement(By.xpath("//span[@role='link' and text()='Cc']")).click();
    }

    async activateBCCfield(){
        this.driver.findElement(By.xpath("//span[@role='link' and text()='CCO']")).click();
    }

    async fillCCfield(_value){
        this.driver.findElement(By.name("cc")).sendKeys(_value);
    }

    async fillBCCfield(_value){
        this.driver.findElement(By.name("bcc")).sendKeys(_value);
    }

    async clickOnSendButton(){
        await this.driver.findElement(By.xpath("//div[@role='button' and text()='Enviar']")).click();
    }

    async discardDraft(){
        var xpath = "/html/body/div[22]/div/div/div/div[1]/div[3]/div[1]/div[1]/div/div/div/div[3]/div/div/div[4]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div/div/div[4]/table/tbody/tr/td[5]/div/div[3]/div/div/div/div"
        await this.driver.findElement(By.xpath(xpath)).click();
    }

    async verifyInbox(){
        //
        var result;
        try{
            //if the element is found, return true in the result(found)
        await this.driver.findElement(By.xpath("//*[text()='"+hashString+"']"));
        result = true;
        }catch(e){
            //if catch a exception, return false (No found)
            result = false;
        }
        return result;
    }

    async selectFirstMessage(){
        var xpath = "/html/body/div[7]/div[3]/div/div[2]/div[1]/div[2]/div/div/div/div/div[2]/div/div[1]/div/div/div[6]/div/div[1]/div[3]/div/table/tbody/tr[1]/td[2]/div"
        await this.driver.findElement(By.xpath(xpath)).click();
    }

    async makeClickOnDelete(){
        await this.driver.findElement(By.xpath("//div[@act='10']")).click();
    }
}

module.exports = MainPage;