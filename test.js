import { AcqClient } from "acq-sdk";

const client = new AcqClient({
    apiKey: "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg1OTUxODI5MDM5NjE4NDU5NyIsIm5hbWUiOiJjdDAyXyIsImRpc3BsYXkiOiJDVDAyIiwibml2ZWwiOiJwcmVtaXVtIiwiaWF0IjoxNzUyNjA2MzI3fQ.zZr7d6ldQDTY8UfNmxqAmrEZXWSPqpW_IyWl4V5OaRFY1xMaKf6vbZTFe7z3M8TjGN1f5gn_87zPAdD08qNiRQ",
});

const mails = client.mails;

mails.create().then(response => {
    console.log("Mail created successfully:", response);
}).catch(error => {
    console.error("Error creating mail:", error);
});