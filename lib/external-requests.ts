import request from 'request';
function callAPI<T>(options: request.OptionsWithUrl, statusCode : number = 200 ): Promise<T> {
    console.log('request made to : ', `${options.method} ${options.url}`);
    return new Promise<T>((resolve, reject) => {
        request(options, (error:any, response: request.Response) => {
            if (error) {
                reject (error);
            }
            console.log('response status from external API : ', response?.statusCode);
            // console.log('response body from external API : ', response?.body);
            if (response && response.statusCode === statusCode ) {
                resolve(response.body);
            } else {
                reject(response?.body)
            }
        });
    });
}

export { callAPI }