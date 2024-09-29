// TODO this page should show the specific game
// should this use a hard id, or a user-specific id?

export default function Page({ params }: { params: { id: number } }) {
    return <div>My game id: {params.id}</div>
}
