
export default function ProfileLoader() {
    return (
        <div className="profile-loader-page">
            <style>{`
                .profile-loader-page {
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    background: #f8fafc;
                    color: #1e293b;
                }

                .profile-skeleton {
                    position: relative;
                    overflow: hidden;
                    background: #e2e8f0;
                    border-radius: 8px;
                }

                .profile-skeleton::after {
                    content: "";
                    position: absolute;
                    inset: 0;
                    transform: translateX(-100%);
                    background: linear-gradient(
                        90deg,
                        transparent,
                        rgba(255, 255, 255, 0.7),
                        transparent
                    );
                    animation: profile-shimmer 1.5s infinite;
                }

                @keyframes profile-shimmer {
                    100% { transform: translateX(100%); }
                }

                .profile-loader-navbar {
                    height: 76px;
                    padding: 0 6%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background: white;
                    border-bottom: 1px solid #e2e8f0;
                }

                .profile-loader-nav-links {
                    display: flex;
                    gap: 22px;
                }

                .profile-loader-main {
                    width: 100%;
                    max-width: 1100px;
                    margin: 0 auto;
                    padding: 44px 24px;
                    flex: 1;
                    box-sizing: border-box;
                }

                .profile-loader-heading {
                    display: flex;
                    align-items: center;
                    gap: 18px;
                    margin-bottom: 32px;
                }

                .profile-loader-avatar {
                    width: 76px;
                    height: 76px;
                    border-radius: 50%;
                    flex-shrink: 0;
                }

                .profile-loader-card {
                    overflow: hidden;
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 14px;
                    box-shadow: 0 4px 18px rgba(15, 23, 42, 0.04);
                }

                .profile-loader-tabs {
                    display: flex;
                    gap: 30px;
                    padding: 0 28px;
                    border-bottom: 1px solid #e2e8f0;
                }

                .profile-loader-tab {
                    width: 110px;
                    height: 54px;
                    border-radius: 5px;
                }

                .profile-loader-content {
                    padding: 30px;
                }

                .profile-loader-field-grid {
                    display: grid;
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                    gap: 24px;
                    margin-top: 26px;
                }

                .profile-loader-field {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .profile-loader-input {
                    height: 46px;
                    border-radius: 7px;
                }

                .profile-loader-button {
                    width: 150px;
                    height: 44px;
                    margin-top: 28px;
                    border-radius: 7px;
                }

                .profile-loader-footer {
                    height: 72px;
                    background: white;
                    border-top: 1px solid #e2e8f0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0 20px;
                }

                @media (max-width: 640px) {
                    .profile-loader-navbar {
                        height: 64px;
                        padding: 0 20px;
                    }

                    .profile-loader-nav-links {
                        gap: 8px;
                    }

                    .profile-loader-main {
                        padding: 28px 16px;
                    }

                    .profile-loader-avatar {
                        width: 60px;
                        height: 60px;
                    }

                    .profile-loader-heading {
                        gap: 14px;
                    }

                    .profile-loader-tabs {
                        gap: 18px;
                        padding: 0 18px;
                    }

                    .profile-loader-tab {
                        width: 85px;
                    }

                    .profile-loader-content {
                        padding: 22px 18px;
                    }

                    .profile-loader-field-grid {
                        grid-template-columns: 1fr;
                        gap: 20px;
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .profile-skeleton::after {
                        animation: none;
                    }
                }
            `}</style>

            {/* Navbar skeleton */}
            <header className="profile-loader-navbar">
                <div className="profile-skeleton" style={{ width: 112, height: 32 }} />
                <div className="profile-loader-nav-links">
                    <div className="profile-skeleton" style={{ width: 34, height: 34, borderRadius: "50%" }} />
                    <div className="profile-skeleton" style={{ width: 34, height: 34, borderRadius: "50%" }} />
                </div>
            </header>

            {/* Profile content skeleton */}
            <main className="profile-loader-main">
                <div className="profile-loader-heading">
                    <div className="profile-skeleton profile-loader-avatar" />
                    <div style={{ flex: 1 }}>
                        <div className="profile-skeleton" style={{ width: "min(220px, 80%)", height: 25, marginBottom: 12 }} />
                        <div className="profile-skeleton" style={{ width: "min(280px, 95%)", height: 15 }} />
                    </div>
                </div>

                <section className="profile-loader-card">
                    <div className="profile-loader-tabs">
                        <div className="profile-skeleton profile-loader-tab" />
                        <div className="profile-skeleton profile-loader-tab" />
                    </div>

                    <div className="profile-loader-content">
                        <div className="profile-skeleton" style={{ width: 190, height: 23 }} />
                        <div className="profile-skeleton" style={{ width: 260, maxWidth: "100%", height: 15, marginTop: 12 }} />

                        <div className="profile-loader-field-grid">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <div className="profile-loader-field" key={index}>
                                    <div className="profile-skeleton" style={{ width: 90, height: 14 }} />
                                    <div className="profile-skeleton profile-loader-input" />
                                </div>
                            ))}
                        </div>

                        <div className="profile-skeleton profile-loader-button" />
                    </div>
                </section>
            </main>

            {/* Footer skeleton */}
            <footer className="profile-loader-footer">
                <div className="profile-skeleton" style={{ width: 220, maxWidth: "80%", height: 14 }} />
            </footer>
        </div>
    );
}
