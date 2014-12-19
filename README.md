# Chihuahua!!

<img src = "http://www.strangefunkidz.com/images/content/124114.jpg" />

npm install

## Development
    npm start

## Production
    npm run min


## Tip:
Set this in nginx:

    #See: https://jira.project-fifo.net/browse/FIFO-566
    proxy_set_header content-type application/json;
    add_header access-control-allow-credentials true;
    proxy_hide_header access-control-allow-origin;
    add_header access-control-allow-origin $http_origin;