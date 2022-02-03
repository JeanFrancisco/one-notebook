export const uploadFile = async (file) => {
    const endpointAPI = 'https://api.cloudinary.com/v1_1/duik09roe341/upload';
    const applicationName = 'uknhgwms-react-journal';
 
    const formBody = new FormData();
    formBody.append('file', file);
    formBody.append('upload_preset', applicationName);

    try {
        const resp = await fetch(endpointAPI, {
            method: 'POST',
            body: formBody,
        });

        if(resp.status === 200)
            return resp.json();
        else
            throw resp.json();

    } catch (err) {
        console.error('Failed to upload the file: ' + err);
    }
}