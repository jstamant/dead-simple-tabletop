import Header from '@/components/header'

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
        <Header />
        {children}
        </>
    )
}
