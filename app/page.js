'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Parser from 'rss-parser';
import { fetchPosts } from '../lib/fetchPosts';

const Home = () => {
  const [rssPosts, setRssPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  
  useEffect(() => {
    const fetchRSSandUserPosts = async () => {
      const parser = new Parser();
      try {
        // Fetching RSS feed
        const data = await parser.parseURL('https://techcrunch.com/feed/');
        const rssPostsData = data.items.slice(0, 10).map(item => ({
          title: item.title,
          link: item.link,
          date: item.isoDate,
          name: "TechCrunch",
        }));
        setRssPosts(rssPostsData);

        // Fetching user posts from Airtable
        const userPostsData = await fetchPosts();
        setUserPosts(userPostsData);
      } catch (error) {
        console.error('Error fetching RSS feed or user posts:', error);
      }
    };

    fetchRSSandUserPosts();
  }, []);

  return (
    <div>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              Latest posts
            </h1>
            <p>
              <Link href="/form">
                <p className="underline cursor-pointer mt-2">Add a new blog</p>
              </Link>
            </p>
          </div>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-4 sm:px-0">
            <div className="border-4 rounded-lg">
              <div className="flex flex-col">
                <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                  <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg">

                    {/* Sección de TechCrunch */}
                    <section>
                      <h2 className="text-2xl font-bold leading-tight text-gray-900">TechCrunch Posts</h2>
                      <table className="min-w-full mt-4">
                        <thead>
                          <tr>
                            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                              Post
                            </th>
                            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {rssPosts.map(post => (
                            <tr key={post.link}>
                              <td className="px-6 py-4 border-b border-gray-200">
                                <a href={post.link} className="text-blue-600 hover:text-blue-800">
                                  {post.title}
                                </a>
                              </td>
                              <td className="px-6 py-4 border-b border-gray-200">
                                {new Date(post.date).toLocaleDateString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </section>

                    {/* Sección de Blogs de Usuarios */}
                    <section className="mt-8">
                      <h2 className="text-2xl font-bold leading-tight text-gray-900">User Blogs</h2>
                      <table className="min-w-full mt-4">
                        <thead>
                          <tr>
                            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                              Blog
                            </th>
                            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {userPosts.length > 0 ? (
                            userPosts.map(post => (
                              <tr key={post.id}>
                                <td className="px-6 py-4 border-b border-gray-200">
                                  <a href={post.blogurl} className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                                    {post.name}
                                  </a>
                                </td>
                                <td className="px-6 py-4 border-b border-gray-200">
                                  {post.date ? new Date(post.date).toLocaleDateString() : 'No date available'}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td className="px-6 py-4 border-b border-gray-200" colSpan="2">
                                No user blogs found
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </section>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
