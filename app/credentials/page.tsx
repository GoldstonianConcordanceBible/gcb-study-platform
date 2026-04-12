import { getCredentials } from "../../lib/account";

export default function CredentialsPage() {
  const credentials = getCredentials();

  return (
    <main style={{ padding: "2rem", maxWidth: 960, margin: "0 auto" }}>
      <h1>Credentials</h1>

      <p>
        Future home for NFT-based course credentials, completion badges, and
        covenant-aligned learning recognition.
      </p>

      <ul>
        {credentials.map((credential) => (
          <li key={credential.id}>
            <strong>{credential.credential_type}</strong>
            <div>Course: {credential.course_id}</div>
            <div>Issued: {credential.issued_date ?? "Unknown"}</div>
            <div>Wallet: {credential.wallet_address}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}