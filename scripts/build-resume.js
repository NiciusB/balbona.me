const puppeteer = require('puppeteer')
const path = require('path')
const fs = require('fs')

async function convertHTMLToPDF (url, callback) {
    console.debug(`Opening puppeteer`)
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-gpu',
            '--hide-scrollbars',
            '--disable-web-security',
        ],
    })

    const page = await browser.newPage()

    console.debug(`Navigating to ${url}`)

    await page.goto(url, {
        waitUntil: 'networkidle0'
    })

    console.debug(`Generating pdf`)

    await page.pdf({
        printBackground: true,
        format: 'A4',
        margin: {
            top: '4mm',
            bottom: '4mm',
            left: '8mm',
            right: '8mm',
        }
    }).then(callback)

    await browser.close()

    console.debug(`All done!`)
}

const resumeSourcePath = path.join(__dirname, '..', 'src_resume_pdf', 'index.html')
const builtResumePdfPath = path.join(__dirname, '..', 'src', 'resume.pdf')
convertHTMLToPDF('file://' + resumeSourcePath, (pdf) => {
    fs.writeFileSync(builtResumePdfPath, pdf)
})
