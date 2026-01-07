"use client"

import * as React from "react"
import {
    IconHome,
    IconFilePlus,
    IconTargetArrow,
    IconSparkles,
    IconMicrophone,
    IconRobot,
    IconCertificate,
    IconLogout,
    IconChevronRight,
    IconBriefcase
} from "@tabler/icons-react"
import { useSession, signOut } from "next-auth/react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
    useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { data: session } = useSession()
    const [resumeOpen, setResumeOpen] = React.useState(true)
    const [interviewOpen, setInterviewOpen] = React.useState(false)

    return (
        <Sidebar collapsible="icon" className="border-r border-white/5 bg-black/50 backdrop-blur-xl" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="hover:bg-transparent active:bg-transparent">
                            <a href="/welcome">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-600 text-sidebar-primary-foreground shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                                    <img src="/letter-v.svg" alt="VPlace Logo" className="size-4 invert" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-bold italic tracking-tighter text-white text-lg">Vplace</span>
                                    <span className="text-xs font-medium text-zinc-500">Dashboard</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="Home">
                            <a href="/resume/home">
                                <IconHome className="text-zinc-400" />
                                <span>Home</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton
                            onClick={() => setResumeOpen(!resumeOpen)}
                            tooltip="Resume Maker"
                            className="justify-between"
                        >
                            <div className="flex items-center gap-2">
                                <IconFilePlus className="text-zinc-400" />
                                <span>Resume Maker</span>
                            </div>
                            <IconChevronRight className={cn("ml-auto transition-transform duration-200", resumeOpen && "rotate-90")} />
                        </SidebarMenuButton>
                        {resumeOpen && (
                            <SidebarMenuSub>
                                <SidebarMenuSubItem>
                                    <SidebarMenuSubButton asChild href="/resume/home">
                                        <a className="flex items-center gap-2">
                                            <IconFilePlus className="size-4" />
                                            <span>Resume Creator</span>
                                        </a>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                                <SidebarMenuSubItem>
                                    <SidebarMenuSubButton asChild href="/resume/ats">
                                        <a className="flex items-center gap-2">
                                            <IconTargetArrow className="size-4" />
                                            <span>ATS Score</span>
                                        </a>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                                <SidebarMenuSubItem>
                                    <SidebarMenuSubButton asChild href="/resume/home#ResumeBuilder">
                                        <a className="flex items-center gap-2">
                                            <IconSparkles className="size-4" />
                                            <span>Resume Enhancer</span>
                                        </a>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                            </SidebarMenuSub>
                        )}
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton
                            onClick={() => setInterviewOpen(!interviewOpen)}
                            tooltip="AI Interviews"
                            className="justify-between"
                        >
                            <div className="flex items-center gap-2">
                                <IconBriefcase className="text-zinc-400" />
                                <span>AI Interviews</span>
                            </div>
                            <IconChevronRight className={cn("ml-auto transition-transform duration-200", interviewOpen && "rotate-90")} />
                        </SidebarMenuButton>
                        {interviewOpen && (
                            <SidebarMenuSub>
                                <div className="px-2 py-1.5 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Sessions</div>
                                <SidebarMenuSubItem>
                                    <SidebarMenuSubButton asChild href="/trainer/interview/mock-interview">
                                        <a className="flex items-center gap-2">
                                            <IconMicrophone className="size-4" />
                                            <span>Professional Session</span>
                                        </a>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                                <SidebarMenuSubItem>
                                    <SidebarMenuSubButton asChild href="/trainer/interview/ai-interview">
                                        <a className="flex items-center gap-2">
                                            <IconRobot className="size-4" />
                                            <span>AI Based Session</span>
                                        </a>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>

                                <div className="px-2 py-1.5 text-[10px] font-bold text-zinc-600 uppercase tracking-widest mt-2">Assessment</div>
                                <SidebarMenuSubItem>
                                    <SidebarMenuSubButton asChild href="/trainer/mocktest">
                                        <a className="flex items-center gap-2">
                                            <IconCertificate className="size-4" />
                                            <span>Mock Tests</span>
                                        </a>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                            </SidebarMenuSub>
                        )}
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={() => signOut({ callbackUrl: '/' })} className="text-red-500 hover:text-red-600 hover:bg-red-500/10">
                            <IconLogout />
                            <span>Logout</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-600/20 border border-blue-500/50 text-blue-400">
                                {session?.user?.image ? (
                                    <img src={session.user.image} className="size-8 rounded-lg object-cover" alt="User" />
                                ) : (
                                    <span className="text-xs font-bold">{session?.user?.name?.charAt(0) || "U"}</span>
                                )}
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold text-white">{session?.user?.name || "User"}</span>
                                <span className="truncate text-xs text-zinc-500">Pro Plan</span>
                            </div>
                            <div className="ml-auto size-2 rounded-full bg-green-500 border border-black" />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}