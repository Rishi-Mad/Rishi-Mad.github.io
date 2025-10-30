export default function ProfileApp() {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">User Profile</h3>
            <p className="text-foreground/80">
                Manage your profile settings and preferences here.
            </p>
            <div className="space-y-2">
                <div className="p-4 rounded-lg bg-bg-2/50">
                    <p className="text-sm font-medium text-foreground">Name</p>
                    <p className="text-sm text-foreground/70">John Doe</p>
                </div>
                <div className="p-4 rounded-lg bg-bg-2/50">
                    <p className="text-sm font-medium text-foreground">Email</p>
                    <p className="text-sm text-foreground/70">john@example.com</p>
                </div>
            </div>
        </div>
    );
}
