/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { Post } from "@/app/tests/posts/page"
import prisma from "@/config/prisma-config"
import path from "path"


export async function createPost(data: Partial<Post>, email?: string) {

    let image_url = null
    if (data.image && data.image instanceof File) {
        const fileName = `${Date.now()}-${path.basename(data.image.name)}`
        image_url = fileName
        // upload image
    }
    const post = await prisma.post.create({
        data: { ...data, image: image_url, user: { connect: { email } } },
    })
    return { post }
}


export async function createProduct(productData: any) {
    const product = await prisma.product.create({
        data: {
            ...productData,
            price: Number(productData?.price),
            user: {
                connect: {
                    email: "chan@123",
                },
            },
        },
    });
    return { product }
}