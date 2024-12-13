export const Variables = {
    TokenAddress: String(process.env.NEXT_PUBLIC_ICO_CONTRACT),
};

export const baseUrl = process.env.NODE_ENV === 'production'? "https://fiat-crypto.vercel.app":"http://localhost:3000"