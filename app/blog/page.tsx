import React from "react";
import Hero from "../components/ui/Hero";
import BlogCard from "../components/ui/BlogCard";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { poppins } from "../fonts/font";
import PostCard from "../components/ui/PostCard";
import Properties from "../components/ui/Properties";
import MyPagination from "../components/ui/MyPagination";

const Blog = () => {
  return (
    <>
      <div>
        <Hero title="Blog" navLink="/blog" navName="Blog" />
      </div>
      <div className="grid md:grid-cols-3 grid-col-1 lg:gap-10 gap-8 lg:p-20 sm:p-14 p-7 ">
        <div className="sec1 lg:space-y-14 space-y-8 md:col-span-2">
          <BlogCard
            cardImg="/blog/blog1.webp"
            iconTag="Wood"
            cardTitle="Going all-in with millennial design"
          />
          <BlogCard
            cardImg="/blog/blog2.webp"
            iconTag="Handmade"
            cardTitle="Exploring new ways of decorating"
          />
          <BlogCard
            cardImg="/blog/blog3.webp"
            iconTag="Wood"
            cardTitle="Handmade pieces that took time to make"
          />
        </div>
        <div className={`${poppins.className} sec2`}>
          <div className="p-3 ">
            <div className="relative">
              <Input className="py-7 rounded-xl " />
              <Image
                src="/blog-icon/akar-icons_search.png"
                width={20}
                height={20}
                alt="search-icon"
                className="absolute top-4 right-4"
              />
            </div>
            <div className="lg:space-y-10 space-y-5 lg:p-8 p-6">
              <h1 className="lg:text-22 text-20 font-semibold">Categories</h1>
              <ul className="text-gray lg:space-y-10 space-y-5">
                <li className="lg:text-16 text-14 flex-between">
                  <p>Crafts</p>
                  <p>2</p>
                </li>
                <li className="lg:text-16 text-14 flex-between">
                  <p>Design</p>
                  <p>8</p>
                </li>
                <li className="lg:text-16 text-14 flex-between">
                  <p>Handmade</p>
                  <p>7</p>
                </li>
                <li className="lg:text-16 text-14 flex-between">
                  <p>Interior</p>
                  <p>1</p>
                </li>
                <li className="lg:text-16 text-14 flex-between">
                  <p>Wood</p>
                  <p>6</p>
                </li>
              </ul>
            </div>
          </div>
          <div className={`${poppins.className} py-5 sm:px-10 px-5 `}>
            <h1 className="text-22 font-semibold mb-5">Recent Posts</h1>
            <div className="space-y-8">
              <PostCard
                postImg="/post/post1.webp"
                postTitle="Going all-in with millennial design"
              />
              <PostCard
                postImg="/post/post2.webp"
                postTitle="Exploring new ways of decorating"
              />
              <PostCard
                postImg="/post/post3.webp"
                postTitle="Handmade pieces that took time to make"
              />
              <PostCard
                postImg="/post/post4.webp"
                postTitle="Modern home in Milan"
              />
              <PostCard
                postImg="/post/post5.webp"
                postTitle="Colorful office redesign"
              />
            </div>
          </div>
        </div>
      </div>
      <MyPagination />
      <div className="mt-8">
        <Properties />
      </div>
    </>
  );
};

export default Blog;
