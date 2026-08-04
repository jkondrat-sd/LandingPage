This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash

npm run dev

# or

yarn dev

```

Building :

    yarn build

Run builded:

    yarn start

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## ENV

Semua frontend dan backend environtment ada di file berikut :

    .env.local

tetapi untuk frontend wajib di fetch menggunakan :

    export async function getServerSideProps(context) {
      return {
        const yourEnv = process.env.YOUR_ENV
        props: {yourEnv}, // will be passed to the page component as props
      }
    }

dan beberapa env akan ada di :

    .env

dan ini hanya di isi untuk client dengan tambahan di depannya `NEXT_PUBLIC_` tetapi ingat semua env yang di sini akan langsung ke expose ke client, jadi isi dengan environment yang tidak terlalu rahasia, yang rahasia bisa melalu extensi local di atas.

[Detail lengkap tentang env next](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props)

Build docker =>
`docker build -t elcoputra/simawas-next_simawas-next:dev-d32451fa3de87096af79e60a1b2f37e1c612b480 -f Dockerfile.advance .`

push to registry => `docker push elcoputra/simawas-next_simawas-next:dev-d32451fa3de87096af79e60a1b2f37e1c612b480`

run from registry => `docker run -d --env-file .env -p 3000:3000 --network global-network --name simawas-next elcoputra/simawas-next_simawas-next:dev-d32451fa3de87096af79e60a1b2f37e1c612b480`

complete command : `docker pull elcoputra/simawas-next_simawas-next:dev-d32451fa3de87096af79e60a1b2f37e1c612b480 && docker stop simawas-next && docker rm simawas-next && docker run -d --env-file .env -p 3000:3000 --network global-network --name simawas-next elcoputra/simawas-next_simawas-next:dev-d32451fa3de87096af79e60a1b2f37e1c612b480`


or device build
build : `docker build -t simawas-next:staging-41736878ac51b69d4f919d6fd96c967d98666776 -f Dockerfile.advance .`
run : `docker run -d --env-file .env -p 3000:3000 --network global-network --name simawas-next simawas-next:staging-41736878ac51b69d4f919d6fd96c967d98666776`
complete run with rm and stop: `docker build -t simawas-next:staging-41736878ac51b69d4f919d6fd96c967d98666776 -f Dockerfile.advance . && docker stop simawas-next && docker rm simawas-next && docker run -d --env-file .env -p 3000:3000 --network global-network --name simawas-next simawas-next:staging-41736878ac51b69d4f919d6fd96c967d98666776`
