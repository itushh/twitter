import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Loader2 } from "lucide-react";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const { login, isLoggingIn } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(formData);
    };

    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <div className="w-full max-w-md space-y-8">
                <div className="flex flex-col items-center">
                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="h-12 w-12 fill-twitter-blue"
                    >
                        <g>
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                        </g>
                    </svg>
                    <h2 className="mt-8 text-3xl font-bold tracking-tight text-twitter-text">
                        Sign in to X
                    </h2>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4 rounded-md shadow-sm">
                        <div>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                className="relative block w-full rounded-md border border-twitter-border bg-twitter-background px-3 py-4 text-twitter-text placeholder-twitter-gray focus:z-10 focus:border-twitter-blue focus:outline-none focus:ring-1 focus:ring-twitter-blue sm:text-sm"
                                placeholder="Username"
                                value={formData.username}
                                onChange={(e) =>
                                    setFormData({ ...formData, username: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="relative block w-full rounded-md border border-twitter-border bg-twitter-background px-3 py-4 text-twitter-text placeholder-twitter-gray focus:z-10 focus:border-twitter-blue focus:outline-none focus:ring-1 focus:ring-twitter-blue sm:text-sm"
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({ ...formData, password: e.target.value })
                                }
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoggingIn}
                            className="group relative flex w-full justify-center rounded-full bg-twitter-text px-4 py-3 text-sm font-bold text-twitter-background hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-twitter-blue focus:ring-offset-2 disabled:bg-twitter-gray"
                        >
                            {isLoggingIn ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                "Log in"
                            )}
                        </button>
                    </div>
                </form>

                <div className="text-center">
                    <p className="text-sm text-twitter-gray">
                        Don't have an account?{" "}
                        <Link
                            to="/signup"
                            className="font-medium text-twitter-blue hover:underline"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
