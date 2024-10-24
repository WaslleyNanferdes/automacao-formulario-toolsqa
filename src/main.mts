import { Builder, By, Key} from 'selenium-webdriver';
import { ServiceBuilder, Options } from 'selenium-webdriver/chrome';
import {path} from 'chromedriver';
import { waitSeconds } from './utils.mts';

function getOptions(): Options {
    const options = new Options();
    options.addArguments(
        '--start-maximized',
        '--disable-extensions',
    );

    return options
}

export default async function main() {

    let firstsName = [
        'Kleiton',
        'Jorge',
        'Cleber',
        'Manoel',
        'Emanoel'
    ]

    let lastsName = [
        'Souza',
        'Silva',
        'Souza',
        'Aquino',
        'Pessoa'
    ]

    let usersEmail = [
        'teste1@teste.com',
        'teste2@teste.com',
        'teste3@teste.com',
        'teste4@teste.com',
        'teste5@teste.com'
    ]

    let genders = [
        'Male',
        'Male',
        'Male',
        'Male',
        'Male'
    ]

    let usersNumber = [
        '1111111111',
        '1211111111',
        '1231111111',
        '1234111111',
        '1234511111',
    ]

    let dayBirth = [
        '22',
        '23',
        '24',
        '25',
        '26'
    ]

    interface dicionario {
        [key: string] : number
    }

    let monthKeys : dicionario = {
        'Jan' : 0,
        'Feb' : 1,
        'Mar' : 2,
        'Apr' : 3,
        'May' : 4,
        'Jun' : 5,
        'Jul' : 6,
        'Aug' : 7,
        'Sep' : 8,
        'Oct' : 9,
        'Nov' : 10,
        'Dec' : 11,
    }

    let monthBirth = [
        'Oct',
        'Oct',
        'Oct',
        'Oct',
        'Oct',
    ]

    let yearBirth = [
        '2000',
        '2001',
        '2002',
        '2003',
        '2004'
    ]

    let subjects = [
        'Math',
        'Math',
        'Math',
        'Math',
        'Math'
    ]

    let state = [
        'NCR',
        'NCR',
        'NCR',
        'NCR',
        'NCR'
    ]

    let city = [
        'Agra',
        'Agra',
        'Agra',
        'Agra',
        'Agra'
    ]

    const options = getOptions();

    const service = new ServiceBuilder(path);

    const webdriver = new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .setChromeService(service)
        .build();

    try {
        for (let i = 0; i < 5;i++) {
            await webdriver.get('https://demoqa.com/automation-practice-form')
            await webdriver.findElement(By.id('firstName')).sendKeys(firstsName[i]);
            await waitSeconds(1)
            await webdriver.findElement(By.id('lastName')).sendKeys(lastsName[i]);
            await waitSeconds(1)
            await webdriver.findElement(By.id('userEmail')).sendKeys(usersEmail[i]);
            await waitSeconds(1)
            let genderRadioInputs = await webdriver.findElements(By.css(`label[for="gender-radio-"]`));
            for (let j = 0; j < genderRadioInputs.length;j++) {
                let text = await genderRadioInputs[j].getText();
                await waitSeconds(1)
                if (text == genders[i]){
                    await genderRadioInputs[j].click();
                    await waitSeconds(1)
                }
            }
            await webdriver.findElement(By.id('userNumber')).sendKeys(usersNumber[i]);
            await waitSeconds(1)

            await webdriver.findElement(By.id('dateOfBirthInput')).click()
            await waitSeconds(1)
            let monthSelect = await webdriver.findElement(By.css('select[class="react-datepicker__month-select"]'))
            await waitSeconds(1)
            await monthSelect.click()
            await waitSeconds(1)
            await monthSelect.findElement(By.css(`option[value="${monthKeys[monthBirth[i]]}"]`)).click()
            await waitSeconds(1)
            let yearSelect = await webdriver.findElement(By.css('select[class="react-datepicker__year-select"]'))
            await waitSeconds(1)
            await yearSelect.click()
            await waitSeconds(1)
            await yearSelect.findElement(By.css(`option[value="${yearBirth[i]}"]`)).click()
            await waitSeconds(1)
            await webdriver.findElement(By.css(`div.react-datepicker__day--0${dayBirth[i]}:not(.react-datepicker__day--outside-month)`)).click()
            await waitSeconds(1)

            await webdriver.findElement(By.id('subjectsInput')).sendKeys(subjects[i]);
            await webdriver.findElement(By.id('subjectsInput')).sendKeys(Key.TAB);
            
            await waitSeconds(1)
            await webdriver.findElement(By.id('react-select-3-input')).sendKeys(state[i]);
            await webdriver.findElement(By.id('react-select-3-input')).sendKeys(Key.ENTER);
            await waitSeconds(1)
            await webdriver.findElement(By.id('react-select-4-input')).sendKeys(city[i]);
            await webdriver.findElement(By.id('react-select-4-input')).sendKeys(Key.ENTER);
            await waitSeconds(1)
            await webdriver.findElement(By.id('submit')).click();
            await waitSeconds(1)
        }
    } catch (error) {
        console.log(`Erro na execução: ${error}`)
    } finally {
        webdriver.quit()
    }
}