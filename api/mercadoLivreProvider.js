import { NextRequest, NextResponse } from "next/server"

const status = "active";
const site_id = "MLA";

export async function getMercadoLivreProducts(search, code){
    try {
        const authToken = await getAccessToken(code);
        sessionStorage.setItem("refreshToken", authToken['refresh_token']);
        //console.log(authToken);
        const response = await fetch(`${process.env.MERCADO_LIVRE_API_URL}/products/search?status=${status}&site_id=${site_id}&q=${encodeURIComponent(search)}`, {
            method:"GET",
            headers: {
                'Authorization': `Bearer ${authToken['access_token']}`,
                'Content-Type': 'application/json'
            }
        });
        if(!response.ok) throw new Error(`Erro HTTP: ${response.status}`)
        const data = response.json();
        return data;
    } catch (err) {
        console.log("Mercado Livre ", err.message.trim())
    }
}

async function getAccessToken(code) {
    const params = new URLSearchParams();
    const refreshTokenFlag = sessionStorage.getItem('refreshToken') ? true : false;
    params.append('grant_type', refreshTokenFlag ? 'refresh_token' : 'authorization_code');
    params.append('client_id', process.env.MERCADO_LIVRE_APP_ID);
    params.append('client_secret', process.env.MERCADO_LIVRE_SECRET_KEY);
    if(refreshTokenFlag) {
        params.append('refresh_token', sessionStorage.getItem('refreshToken'));
    } else {
        params.append('code', code);
        params.append('redirect_uri', process.env.MERCADO_LIVRE_REDIRECT_URI);
    }

    const response = await fetch(`${process.env.MERCADO_LIVRE_API_URL}/oauth/token`, {
            method:"POST",
            headers: {
                'accept': 'application/json',
                'content-type': 'application/x-www-form-urlencoded'
            },
        body: params
    })
    return response.json();
}
