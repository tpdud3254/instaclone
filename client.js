import { PrismaClient } from "@prisma/client"; //여기로 import된 자바스크립트 클라이언트는 우리의 스키마에 맞춰 생성된거임

const client = new PrismaClient(); //클라이언트 생성

export default client;
