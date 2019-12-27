cd resume
wkhtmltopdf --page-size A4 --margin-top 6mm --margin-bottom 6mm --margin-left 0 --margin-right 0 ./index.html ../public/resume.pdf
cd ..