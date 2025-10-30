export default function SettingsApp() {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">System Settings</h3>
            <div className="space-y-3">
                <div className="p-4 rounded-lg bg-bg-2/50 hover:bg-bg-3/50 transition-colors cursor-pointer">
                    <p className="text-sm font-medium text-foreground">Appearance</p>
                    <p className="text-xs text-foreground/60 mt-1">Customize theme and colors</p>
                </div>
                <div className="p-4 rounded-lg bg-bg-2/50 hover:bg-bg-3/50 transition-colors cursor-pointer">
                    <p className="text-sm font-medium text-foreground">Notifications</p>
                    <p className="text-xs text-foreground/60 mt-1">
                        Manage notification preferences
                    </p>
                </div>
                <div className="p-4 rounded-lg bg-bg-2/50 hover:bg-bg-3/50 transition-colors cursor-pointer">
                    <p className="text-sm font-medium text-foreground">Privacy</p>
                    <p className="text-xs text-foreground/60 mt-1">Control your data and privacy</p>
                </div>
            </div>
        </div>
    );
}
