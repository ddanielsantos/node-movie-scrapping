import * as fs from 'fs'
import * as path from 'path'
import puppeteer from 'puppeteer-core';

// Usuário será levado em consideração na URL futuramente
const timeSeparator = new RegExp('(/)|( )|(:)', 'g')

//Ainda não decidi como que vou adicionar os dados na API, por hora vou tirar screenshots

// Lembrar de mudar a forma de obter o caminho do browser depois
const browserPath = path.join('C:/', 'Program Files', 'Firefox Developer Edition', 'firefox.exe')

async function getElements(user: string): Promise<void> {
    
    // Nome do arquivo a ser salvo
    const timePrefix = new Date().toLocaleString().replace(timeSeparator, '-') + `-${user}`
    // console.log(timePrefix)
    
    const browser = await puppeteer.launch({
        // headless: false,
        product: 'firefox',
        executablePath: browserPath,
    });
    
    const page = await browser.newPage();
    await page.goto(`https://letterboxd.com/${user}`, {
        timeout: 0,
    });

    const saveDirectory = './screenshots/'

    if(!fs.existsSync(saveDirectory)){
        console.log('Creating folder')
        fs.mkdirSync(saveDirectory)
    }

    await page.screenshot({ path: saveDirectory + timePrefix + '.png' });
    
    // console.log('before query')
    // const nodes = await page.evaluate(() => {
        
    //     const elements = document.querySelectorAll('section#profile-header nav ul li a.navlink')
        
    //     return elements
    // })
    // console.log('after query')
    // console.log(nodes)
    // console.log(nodes[0])

    await browser.close();
}

getElements('suitingpie52')