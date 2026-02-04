/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Content } from "@/model/Content";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../../../lib/axios";
import { ApiResponse } from "@/model/ApiResponse";
import Swal from "sweetalert2";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

type Params = {
  id: number;
};

interface ContentDetailPageProps {
  params: Promise<Params>;
}

export default function ContentDetailPage({ params }: ContentDetailPageProps) {
  const resolvedParams = React.use(params);
  const [content, setContent] = useState<Content | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axiosInstance.get<ApiResponse<Content>>(
          `/fe/contents/${resolvedParams.id}`,
        );
        setContent(response.data.data);
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
          toast: true,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    };

    fetchContent();
  }, [resolvedParams.id]);

  return (
    <div>
      <div className="container px-8 mx-auto xl:px-5 max-w-screen-lg py-5 lg:py-8 !pt-0">
        <div className="mx-auto max-w-screen-md">
          <div className="flex justify-center">
            <div className="flex gap-3">
              <Link href={`/category/${content?.category_id}`}>
                <span className="inline-block text-sm font-medium tracking-wider uppercase mt-5 text-blue-600">
                  {content?.category_name}
                </span>
              </Link>
            </div>
          </div>
          <h2 className="text-brand-primary mb-3 mt-2 text-center text-3xl font-semibold tracking-tight lg:text-4xl lg:leading-snug">
            <span className="bg-gradient-to-r from-green-200 to-green-100 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px]">
              {content?.title}
            </span>
          </h2>
        </div>

        <div className="mt-3 flex justify-center space-x-3 text-gray-500">
          <div className="flex items-center gap-3">
            <div>
              <p className="text-gray-800">{content?.author}</p>
              <div className="flex items-center space-x-2 text-sm">
                <time
                  dateTime="2024-11-26T17:00:00.000Z"
                  className="truncate text-sm"
                >
                  {content?.created_at && formatDate(content.created_at)}
                </time>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-0 mx-auto aspect-video max-w-screen-lg overflow-hidden lg:rounded-lg">
        <img
          src={content?.image}
          alt={content?.title}
          className="object-cover w-screen"
        />
      </div>
      <div className="container px-8 mx-auto max-w-screen-lg py-5 lg:py-8">
        <article className="mx-auto max-w-screen-md">
          <div className="prose mx-auto my-3">{content?.description}</div>
          <div className="mb-7 mt-7 flex justify-center">
            <Link
              href={"/content-all"}
              className="bg-brand-secondary/20 rounded-full px-5 py-2 text-sm text-blue-600"
            >
              See All Content
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
