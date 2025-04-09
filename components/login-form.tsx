"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

interface LoginFormProps {
  onLogin: () => void
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  // Login state
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Register state
  const [registerUsername, setRegisterUsername] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerError, setRegisterError] = useState("")
  const [isRegistering, setIsRegistering] = useState(false)

  // Active tab
  const [activeTab, setActiveTab] = useState("login")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!username || !password) {
      setError("Please enter both username and password")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Login failed")
      }

      // Call the onLogin callback to update the app state
      onLogin()
    } catch (error: any) {
      setError(error.message || "Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setRegisterError("")

    if (!registerUsername || !registerPassword) {
      setRegisterError("Please enter both username and password")
      return
    }

    setIsRegistering(true)

    console.log("Registering user:", JSON.stringify({
      username: registerUsername,
      password: registerPassword,
      email: registerEmail || undefined,
    }));

    try {
      const response = await fetch("/api/auth/login/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: registerUsername,
          password: registerPassword,
          email: registerEmail || undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Registration failed")
      }

      // Call the onLogin callback to update the app state
      onLogin()
    } catch (error: any) {
      setRegisterError(error.message || "Registration failed. Please try again.")
    } finally {
      setIsRegistering(false)
    }
  }

  return (
    <Card className="border-gray-800 bg-gray-900/60 backdrop-blur-sm">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-white">Welcome to OSTRICH</CardTitle>
            <TabsList className="bg-gray-800">
              <TabsTrigger value="login" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
                Login
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
              >
                Register
              </TabsTrigger>
            </TabsList>
          </div>
          <CardDescription className="text-gray-400">
            {activeTab === "login"
              ? "Enter your credentials to access the OSTRICH platform"
              : "Create a new account to get started"}
          </CardDescription>
        </CardHeader>

        <TabsContent value="login">
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4 bg-red-900/20 border-red-800">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-300">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button onClick={handleLogin} className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
              {isLoading ? "Authenticating..." : "Login"}
            </Button>
          </CardFooter>
        </TabsContent>

        <TabsContent value="register">
          <CardContent>
            {registerError && (
              <Alert variant="destructive" className="mb-4 bg-red-900/20 border-red-800">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{registerError}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-username" className="text-gray-300">
                  Username
                </Label>
                <Input
                  id="register-username"
                  type="text"
                  placeholder="Choose a username"
                  value={registerUsername}
                  onChange={(e) => setRegisterUsername(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email" className="text-gray-300">
                  Email (optional)
                </Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="your@email.com"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password" className="text-gray-300">
                  Password
                </Label>
                <Input
                  id="register-password"
                  type="password"
                  placeholder="••••••••"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleRegister}
              className="w-full bg-emerald-600 hover:bg-emerald-700"
              disabled={isRegistering}
            >
              {isRegistering ? "Creating Account..." : "Register"}
            </Button>
          </CardFooter>
        </TabsContent>
      </Tabs>
    </Card>
  )
}

