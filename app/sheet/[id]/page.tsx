// TODO this page should show the specific character sheet
// should this use a hard id, or a user-specific id?

export default function Page({ params }: { params: { id: number } }) {
    return <div>My sheet id: {params.id}</div>
}
