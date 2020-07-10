import React, { Component } from "react";
import "./DigitalSignedTechnical.scss";
import { ReactComponent as InputSvg } from "../../img/input.svg";
import { ReactComponent as OutputSvg } from "../../img/output.svg";
import { ReactComponent as Output2Svg } from "../../img/output2.svg";
import ReactJson from "react-json-view";

class DigitalSignedTechnical extends Component {
  render() {
    return (
      <div className="tab--content">
        <div className="tech-step">
          <div className="step-num">1</div>
          <div className="step-desc">
            Retrieve the information stored on the blockchain at the{" "}
            <a href="https://www.w3.org/TR/did-core/">
              De-centralized Identified address (DID)
            </a>{" "}
            and resolve it to obtain the first JWT payload.
          </div>
        </div>
        <div className="step-section">
          <div className="section-icon">
            <InputSvg />
          </div>
          <div className="section-container">
            <div className="section-title">input</div>
            <div className="section-desc">
              DID Address:{" "}
              <a href="https://uniresolver.io/1.0/identifiers/did:ethr:0xe0b1833c7032aAc1B8d4661aF9295623F40fc956">
                did:ethr:0xe0b1833c7032aAc1B8d4661aF9295623F40fc956
              </a>
            </div>
          </div>
        </div>
        <div className="step-section">
          <div className="section-icon">
            <OutputSvg />
          </div>
          <div className="section-container">
            <div className="section-title">output</div>
            <div className="section-desc">
              Public Keys:
              <br />
              <a href="https://uniresolver.io/1.0/identifiers/did:ethr:0x6efedeaec20e79071251fffa655F1bdDCa65c027">
                did:ethr:0x6efedeaec20e79071251fffa655F1bdDCa65c027
              </a>
              <br />
              JWT Payload:
              <br />
              <a href="https://jwt.io?access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NkstUiJ9.eyJpYXQiOjE1OTEwMjE3MTIsInZwIjp7IkBjb250ZXh0IjpbImh0dHBzOi8vd3d3LnczLm9yZy8yMDE4L2NyZWRlbnRpYWxzL3YxIl0sInR5cGUiOlsiVmVyaWZpYWJsZVByZXNlbnRhdGlvbiJdLCJ2ZXJpZmlhYmxlQ3JlZGVudGlhbCI6WyJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpGVXpJMU5rc3RVaUo5LmV5SnBZWFFpT2pFMU9URXdNakV4TVRjc0luTjFZaUk2SW1ScFpEcGxkR2h5T2pCNE5tVm1aV1JsWVdWak1qQmxOemt3TnpFeU5URm1abVpoTmpVMVJqRmlaRVJEWVRZMVl6QXlOeUlzSW01aVppSTZNVFU1TVRBeU1URXhOU3dpZG1NaU9uc2lRR052Ym5SbGVIUWlPbHNpYUhSMGNITTZMeTkzZDNjdWR6TXViM0puTHpJd01UZ3ZZM0psWkdWdWRHbGhiSE12ZGpFaUxDSm9kSFJ3Y3pvdkwzZDNkeTUzTXk1dmNtY3ZNakF4T0M5amNtVmtaVzUwYVdGc2N5OWxlR0Z0Y0d4bGN5OTJNU0pkTENKcFpDSTZJbVJwWkRwbGRHaHlPakI0WlRCaU1UZ3pNMk0zTURNeVlVRmpNVUk0WkRRMk5qRmhSamt5T1RVMk1qTkdOREJtWXprMU5pSXNJblI1Y0dVaU9sc2lWbVZ5YVdacFlXSnNaVU55WldSbGJuUnBZV3dpTENKVVpYaGhjMDV2ZEdGeWVVTnlaV1JsYm5ScFlXd2lYU3dpYVhOemRXVnlJanA3SW1sa0lqb2laR2xrT21WMGFISTZNSGd5WVRaR01VUTFNRGd6Wm1JeE9XSTVaakpETmpVelFqVTVPR0ZpUTJJMU56QTFaVVF3TkRNNUlpd2laVzV6Ukc5dFlXbHVJam9pYlhsd1lYTnpMbVYwYUNJc0ltNXZkR0Z5ZVVsa0lqb3hNak0wTlN3aWJtOTBZWEo1VUhWaWJHbGpTMlY1SWpvaUxTMHRMUzFDUlVkSlRpQlNVMEVnVUZWQ1RFbERJRXRGV1MwdExTMHRYRzVOU1VkS1FXOUhRa0ZLZUdkYVEwUnlhRWxvV2xCUFowZExkRE5NWVVGQk1TOW9WbmRzYzFCdmRGZzFZM05uUkZCR2VHbG1TM0JTTnpWMFlUSlpaVEZXWEc0dmVWbGpja3c0V1ZocE5VYzBVbTlIZGxRd1V6TnVia2xuTldGQ1lrNVJXRmhIYVVaWlV5dHRXR0ZSUVdkSFEzQmhaM1pGWVZwQlMyazNXa2hHTVU5WlhHNUJiRXN2UVZvNVYxcG9jMlE0ZFhFNVpXZ3hiR296TDJsNlpXTlBVRTlXTTNSbFZGRm1jMFpHVDI1eVNuRm9LMFpwYW1aUVFXZE5Ra0ZCUlQxY2JpMHRMUzB0UlU1RUlGSlRRU0JRVlVKTVNVTWdTMFZaTFMwdExTMGlmU3dpYVhOemRXRnVZMlZFWVhSbElqb3hOVGt4TURJeE1URTFNekk0TENKbGVIQnBjbUYwYVc5dVJHRjBaU0k2SWpJd01qRXRNRFl0TURGVU1UUTZNVGc2TURNdU1EQXdXaUlzSW1OeVpXUmxiblJwWVd4VGRXSnFaV04wSWpwN0ltbGtJam9pWkdsa09tVjBhSEk2TUhnMlpXWmxaR1ZoWldNeU1HVTNPVEEzTVRJMU1XWm1abUUyTlRWR01XSmtSRU5oTmpWak1ESTNJaXdpWlc1elJHOXRZV2x1SWpvaWJYbHdZWE56TG1WMGFDSXNJbFJsZUdGelJHbG5hWFJoYkU1dmRHRnllU0k2ZXlKMGVYQmxJam9pWTJWeWRHbG1hV1ZrUTI5d2VTSXNJbk5wWjI1bFpFUnZZM1Z0Wlc1MFNHRnphQ0k2SWxGamRUZDZSVlJzZGxOSllVVkRiVzU0TTJZeGJVSjJVMWhEZERsNFpVWTRjakJVYjI0d1NGUnRaVEZtZERNelRFeFFjemhFYjJKYVdrMXhia3RZWTJGcEwxWjJZbE0yVFM4dlQwZFpNaXRHUkdOV2VrOUhhblpYZVZoSk1IWkpkSHBYUkVSNFJrdFFaMWhpVUVwbk0zVXpSSE41WkRKSlVVUk1NMDlwU0U4eGRVdHVXVEptUW1GTWFrRXhjMm8wUnpkeFVHeFNNa0ZhZW1OTFVuaDZObkZ1V0RkbVEwVmhZWFZrWXowaUxDSm9ZWE5vVkhsd1pTSTZJazFFTlNKOWZYMHNJbWx6Y3lJNkltUnBaRHBsZEdoeU9qQjRNbUUyUmpGRU5UQTRNMlppTVRsaU9XWXlRelkxTTBJMU9UaGhZa05pTlRjd05XVkVNRFF6T1NKOS5lT0hKSnBwcEhBOC1rSVkyUkRkdUtUQk9IVmJ4VEZUVUxFWVVQUzNNWlp0ZE9sN284clNYSld0VXU3S2NRSldMc2pXZkp5ZzA3d25HdWdqYS0ySDM5QUEiXX0sImlzcyI6ImRpZDpldGhyOjB4NmVmZWRlYWVjMjBlNzkwNzEyNTFmZmZhNjU1RjFiZERDYTY1YzAyNyJ9._GSiTa7GLsMG57MAdjUUKg9NhLFc7ns2DV0R3zmGWVR_CselovyWeL9_QYvVPs1VzUYAzw4htmga94SC6NwA">
                eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NkstUiJ9...
              </a>
            </div>
          </div>
        </div>
        <div className="tech-step">
          <div className="step-num">1a</div>
          <div className="step-desc">
            The first JWT is decoded with the holders ETH public key obtain the
            VP (
            <a href="https://www.w3.org/TR/vc-data-model/#presentations">
              Verifiable Presentation
            </a>
            ) payload signed with the owner's public key.
          </div>
        </div>
        <div className="step-section">
          <div className="section-icon">
            <InputSvg />
          </div>
          <div className="section-container">
            <div className="section-title">input</div>
            <div className="section-desc">
              JWT Payload:
              <br />
              <a href="https://jwt.io?access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NkstUiJ9.eyJpYXQiOjE1OTEwMjE3MTIsInZwIjp7IkBjb250ZXh0IjpbImh0dHBzOi8vd3d3LnczLm9yZy8yMDE4L2NyZWRlbnRpYWxzL3YxIl0sInR5cGUiOlsiVmVyaWZpYWJsZVByZXNlbnRhdGlvbiJdLCJ2ZXJpZmlhYmxlQ3JlZGVudGlhbCI6WyJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpGVXpJMU5rc3RVaUo5LmV5SnBZWFFpT2pFMU9URXdNakV4TVRjc0luTjFZaUk2SW1ScFpEcGxkR2h5T2pCNE5tVm1aV1JsWVdWak1qQmxOemt3TnpFeU5URm1abVpoTmpVMVJqRmlaRVJEWVRZMVl6QXlOeUlzSW01aVppSTZNVFU1TVRBeU1URXhOU3dpZG1NaU9uc2lRR052Ym5SbGVIUWlPbHNpYUhSMGNITTZMeTkzZDNjdWR6TXViM0puTHpJd01UZ3ZZM0psWkdWdWRHbGhiSE12ZGpFaUxDSm9kSFJ3Y3pvdkwzZDNkeTUzTXk1dmNtY3ZNakF4T0M5amNtVmtaVzUwYVdGc2N5OWxlR0Z0Y0d4bGN5OTJNU0pkTENKcFpDSTZJbVJwWkRwbGRHaHlPakI0WlRCaU1UZ3pNMk0zTURNeVlVRmpNVUk0WkRRMk5qRmhSamt5T1RVMk1qTkdOREJtWXprMU5pSXNJblI1Y0dVaU9sc2lWbVZ5YVdacFlXSnNaVU55WldSbGJuUnBZV3dpTENKVVpYaGhjMDV2ZEdGeWVVTnlaV1JsYm5ScFlXd2lYU3dpYVhOemRXVnlJanA3SW1sa0lqb2laR2xrT21WMGFISTZNSGd5WVRaR01VUTFNRGd6Wm1JeE9XSTVaakpETmpVelFqVTVPR0ZpUTJJMU56QTFaVVF3TkRNNUlpd2laVzV6Ukc5dFlXbHVJam9pYlhsd1lYTnpMbVYwYUNJc0ltNXZkR0Z5ZVVsa0lqb3hNak0wTlN3aWJtOTBZWEo1VUhWaWJHbGpTMlY1SWpvaUxTMHRMUzFDUlVkSlRpQlNVMEVnVUZWQ1RFbERJRXRGV1MwdExTMHRYRzVOU1VkS1FXOUhRa0ZLZUdkYVEwUnlhRWxvV2xCUFowZExkRE5NWVVGQk1TOW9WbmRzYzFCdmRGZzFZM05uUkZCR2VHbG1TM0JTTnpWMFlUSlpaVEZXWEc0dmVWbGpja3c0V1ZocE5VYzBVbTlIZGxRd1V6TnVia2xuTldGQ1lrNVJXRmhIYVVaWlV5dHRXR0ZSUVdkSFEzQmhaM1pGWVZwQlMyazNXa2hHTVU5WlhHNUJiRXN2UVZvNVYxcG9jMlE0ZFhFNVpXZ3hiR296TDJsNlpXTlBVRTlXTTNSbFZGRm1jMFpHVDI1eVNuRm9LMFpwYW1aUVFXZE5Ra0ZCUlQxY2JpMHRMUzB0UlU1RUlGSlRRU0JRVlVKTVNVTWdTMFZaTFMwdExTMGlmU3dpYVhOemRXRnVZMlZFWVhSbElqb3hOVGt4TURJeE1URTFNekk0TENKbGVIQnBjbUYwYVc5dVJHRjBaU0k2SWpJd01qRXRNRFl0TURGVU1UUTZNVGc2TURNdU1EQXdXaUlzSW1OeVpXUmxiblJwWVd4VGRXSnFaV04wSWpwN0ltbGtJam9pWkdsa09tVjBhSEk2TUhnMlpXWmxaR1ZoWldNeU1HVTNPVEEzTVRJMU1XWm1abUUyTlRWR01XSmtSRU5oTmpWak1ESTNJaXdpWlc1elJHOXRZV2x1SWpvaWJYbHdZWE56TG1WMGFDSXNJbFJsZUdGelJHbG5hWFJoYkU1dmRHRnllU0k2ZXlKMGVYQmxJam9pWTJWeWRHbG1hV1ZrUTI5d2VTSXNJbk5wWjI1bFpFUnZZM1Z0Wlc1MFNHRnphQ0k2SWxGamRUZDZSVlJzZGxOSllVVkRiVzU0TTJZeGJVSjJVMWhEZERsNFpVWTRjakJVYjI0d1NGUnRaVEZtZERNelRFeFFjemhFYjJKYVdrMXhia3RZWTJGcEwxWjJZbE0yVFM4dlQwZFpNaXRHUkdOV2VrOUhhblpYZVZoSk1IWkpkSHBYUkVSNFJrdFFaMWhpVUVwbk0zVXpSSE41WkRKSlVVUk1NMDlwU0U4eGRVdHVXVEptUW1GTWFrRXhjMm8wUnpkeFVHeFNNa0ZhZW1OTFVuaDZObkZ1V0RkbVEwVmhZWFZrWXowaUxDSm9ZWE5vVkhsd1pTSTZJazFFTlNKOWZYMHNJbWx6Y3lJNkltUnBaRHBsZEdoeU9qQjRNbUUyUmpGRU5UQTRNMlppTVRsaU9XWXlRelkxTTBJMU9UaGhZa05pTlRjd05XVkVNRFF6T1NKOS5lT0hKSnBwcEhBOC1rSVkyUkRkdUtUQk9IVmJ4VEZUVUxFWVVQUzNNWlp0ZE9sN284clNYSld0VXU3S2NRSldMc2pXZkp5ZzA3d25HdWdqYS0ySDM5QUEiXX0sImlzcyI6ImRpZDpldGhyOjB4NmVmZWRlYWVjMjBlNzkwNzEyNTFmZmZhNjU1RjFiZERDYTY1YzAyNyJ9._GSiTa7GLsMG57MAdjUUKg9NhLFc7ns2DV0R3zmGWVR_CselovyWeL9_QYvVPs1VzUYAzw4htmga94SC6NwA">
                eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NkstUiJ9...
              </a>
            </div>
          </div>
        </div>
        <div className="step-section">
          <div className="section-icon">
            <OutputSvg />
          </div>
          <div className="section-container">
            <div className="section-title">output</div>
            <div className="section-desc">
              <ReactJson
                src={vpDecode}
                theme="rjv-default"
                indentWidth={2}
                collapseStringsAfterLength={28}
                displayObjectSize={false}
                displayDataTypes={false}
              />
            </div>
          </div>
        </div>
        <div className="tech-step">
          <div className="step-num">1b</div>
          <div className="step-desc">
            That second JWT in the VP is then decoded with the owner's public
            key to obtain a VC (
            <a href="https://www.w3.org/TR/vc-data-model/#credentials">
              Verifiable Credential
            </a>
            ) payload.
          </div>
        </div>
        <div className="step-section">
          <div className="section-icon">
            <InputSvg />
          </div>
          <div className="section-container">
            <div className="section-title">input</div>
            <div className="section-desc">
              JWT Payload:
              <br />
              <a href="https://jwt.io?access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NkstUiJ9.eyJpYXQiOjE1OTEwMjExMTcsInN1YiI6ImRpZDpldGhyOjB4NmVmZWRlYWVjMjBlNzkwNzEyNTFmZmZhNjU1RjFiZERDYTY1YzAyNyIsIm5iZiI6MTU5MTAyMTExNSwidmMiOnsiQGNvbnRleHQiOlsiaHR0cHM6Ly93d3cudzMub3JnLzIwMTgvY3JlZGVudGlhbHMvdjEiLCJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy9leGFtcGxlcy92MSJdLCJpZCI6ImRpZDpldGhyOjB4ZTBiMTgzM2M3MDMyYUFjMUI4ZDQ2NjFhRjkyOTU2MjNGNDBmYzk1NiIsInR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiLCJUZXhhc05vdGFyeUNyZWRlbnRpYWwiXSwiaXNzdWVyIjp7ImlkIjoiZGlkOmV0aHI6MHgyYTZGMUQ1MDgzZmIxOWI5ZjJDNjUzQjU5OGFiQ2I1NzA1ZUQwNDM5IiwiZW5zRG9tYWluIjoibXlwYXNzLmV0aCIsIm5vdGFyeUlkIjoxMjM0NSwibm90YXJ5UHVibGljS2V5IjoiLS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tXG5NSUdKQW9HQkFKeGdaQ0RyaEloWlBPZ0dLdDNMYUFBMS9oVndsc1BvdFg1Y3NnRFBGeGlmS3BSNzV0YTJZZTFWXG4veVljckw4WVhpNUc0Um9HdlQwUzNubklnNWFCYk5RWFhHaUZZUyttWGFRQWdHQ3BhZ3ZFYVpBS2k3WkhGMU9ZXG5BbEsvQVo5V1poc2Q4dXE5ZWgxbGozL2l6ZWNPUE9WM3RlVFFmc0ZGT25ySnFoK0ZpamZQQWdNQkFBRT1cbi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0ifSwiaXNzdWFuY2VEYXRlIjoxNTkxMDIxMTE1MzI4LCJleHBpcmF0aW9uRGF0ZSI6IjIwMjEtMDYtMDFUMTQ6MTg6MDMuMDAwWiIsImNyZWRlbnRpYWxTdWJqZWN0Ijp7ImlkIjoiZGlkOmV0aHI6MHg2ZWZlZGVhZWMyMGU3OTA3MTI1MWZmZmE2NTVGMWJkRENhNjVjMDI3IiwiZW5zRG9tYWluIjoibXlwYXNzLmV0aCIsIlRleGFzRGlnaXRhbE5vdGFyeSI6eyJ0eXBlIjoiY2VydGlmaWVkQ29weSIsInNpZ25lZERvY3VtZW50SGFzaCI6IlFjdTd6RVRsdlNJYUVDbW54M2YxbUJ2U1hDdDl4ZUY4cjBUb24wSFRtZTFmdDMzTExQczhEb2JaWk1xbktYY2FpL1Z2YlM2TS8vT0dZMitGRGNWek9HanZXeVhJMHZJdHpXRER4RktQZ1hiUEpnM3UzRHN5ZDJJUURMM09pSE8xdUtuWTJmQmFMakExc2o0RzdxUGxSMkFaemNLUnh6NnFuWDdmQ0VhYXVkYz0iLCJoYXNoVHlwZSI6Ik1ENSJ9fX0sImlzcyI6ImRpZDpldGhyOjB4MmE2RjFENTA4M2ZiMTliOWYyQzY1M0I1OThhYkNiNTcwNWVEMDQzOSJ9.eOHJJpppHA8-kIY2RDduKTBOHVbxTFTULEYUPS3MZZtdOl7o8rSXJWtUu7KcQJWLsjWfJyg07wnGugja-2H39AA">
                eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NkstUiJ9...
              </a>
            </div>
          </div>
        </div>
        <div className="step-section">
          <div className="section-icon">
            <OutputSvg />
          </div>
          <div className="section-container">
            <div className="section-title">output</div>
            <div className="section-desc">
              <ReactJson
                src={vcDecode}
                theme="rjv-default"
                indentWidth={2}
                collapseStringsAfterLength={28}
                displayObjectSize={false}
                displayDataTypes={false}
              />
            </div>
          </div>
        </div>
        <div className="tech-step">
          <div className="step-num">2</div>
          <div className="step-desc">
            The Notary’s PGP key is retrieved from the VC and used to decrypt
            the signed Hash string to get the MD5 hash of the document image.
          </div>
        </div>
        <div className="step-section">
          <div className="section-icon">
            <InputSvg />
          </div>
          <div className="section-container">
            <div className="section-title">input</div>
            <div className="section-desc">
              Notary PEM Public Key:
              <br />
              <a href="https://uniresolver.io/1.0/identifiers/did:ethr:0x6efedeaec20e79071251fffa655F1bdDCa65c027">
                did:ethr:0x6efedeaec20e79071251fffa655F1bdDCa65c027
              </a>
              <br />
              Signed hash: 988e646e834b5e9cbc92722d907b5833
              <br />
            </div>
          </div>
        </div>
        <div className="step-section">
          <div className="section-icon">
            <Output2Svg />
          </div>
          <div className="section-container">
            <div className="section-title">output</div>
            <div className="section-desc">
              MD5 hash: FCCB13D5961A13DA9E955A44C8106E39
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DigitalSignedTechnical;

const vpDecode = {
  iat: 1591021712,
  vp: {
    "@context": ["https://www.w3.org/2018/credentials/v1"],
    type: ["VerifiablePresentation"],
    verifiableCredential: [
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NkstUiJ9.eyJpYXQiOjE1OTEwMjExMTcsInN1YiI6ImRpZDpldGhyOjB4NmVmZWRlYWVjMjBlNzkwNzEyNTFmZmZhNjU1RjFiZERDYTY1YzAyNyIsIm5iZiI6MTU5MTAyMTExNSwidmMiOnsiQGNvbnRleHQiOlsiaHR0cHM6Ly93d3cudzMub3JnLzIwMTgvY3JlZGVudGlhbHMvdjEiLCJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy9leGFtcGxlcy92MSJdLCJpZCI6ImRpZDpldGhyOjB4ZTBiMTgzM2M3MDMyYUFjMUI4ZDQ2NjFhRjkyOTU2MjNGNDBmYzk1NiIsInR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiLCJUZXhhc05vdGFyeUNyZWRlbnRpYWwiXSwiaXNzdWVyIjp7ImlkIjoiZGlkOmV0aHI6MHgyYTZGMUQ1MDgzZmIxOWI5ZjJDNjUzQjU5OGFiQ2I1NzA1ZUQwNDM5IiwiZW5zRG9tYWluIjoibXlwYXNzLmV0aCIsIm5vdGFyeUlkIjoxMjM0NSwibm90YXJ5UHVibGljS2V5IjoiLS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tXG5NSUdKQW9HQkFKeGdaQ0RyaEloWlBPZ0dLdDNMYUFBMS9oVndsc1BvdFg1Y3NnRFBGeGlmS3BSNzV0YTJZZTFWXG4veVljckw4WVhpNUc0Um9HdlQwUzNubklnNWFCYk5RWFhHaUZZUyttWGFRQWdHQ3BhZ3ZFYVpBS2k3WkhGMU9ZXG5BbEsvQVo5V1poc2Q4dXE5ZWgxbGozL2l6ZWNPUE9WM3RlVFFmc0ZGT25ySnFoK0ZpamZQQWdNQkFBRT1cbi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0ifSwiaXNzdWFuY2VEYXRlIjoxNTkxMDIxMTE1MzI4LCJleHBpcmF0aW9uRGF0ZSI6IjIwMjEtMDYtMDFUMTQ6MTg6MDMuMDAwWiIsImNyZWRlbnRpYWxTdWJqZWN0Ijp7ImlkIjoiZGlkOmV0aHI6MHg2ZWZlZGVhZWMyMGU3OTA3MTI1MWZmZmE2NTVGMWJkRENhNjVjMDI3IiwiZW5zRG9tYWluIjoibXlwYXNzLmV0aCIsIlRleGFzRGlnaXRhbE5vdGFyeSI6eyJ0eXBlIjoiY2VydGlmaWVkQ29weSIsInNpZ25lZERvY3VtZW50SGFzaCI6IlFjdTd6RVRsdlNJYUVDbW54M2YxbUJ2U1hDdDl4ZUY4cjBUb24wSFRtZTFmdDMzTExQczhEb2JaWk1xbktYY2FpL1Z2YlM2TS8vT0dZMitGRGNWek9HanZXeVhJMHZJdHpXRER4RktQZ1hiUEpnM3UzRHN5ZDJJUURMM09pSE8xdUtuWTJmQmFMakExc2o0RzdxUGxSMkFaemNLUnh6NnFuWDdmQ0VhYXVkYz0iLCJoYXNoVHlwZSI6Ik1ENSJ9fX0sImlzcyI6ImRpZDpldGhyOjB4MmE2RjFENTA4M2ZiMTliOWYyQzY1M0I1OThhYkNiNTcwNWVEMDQzOSJ9.eOHJJpppHA8-kIY2RDduKTBOHVbxTFTULEYUPS3MZZtdOl7o8rSXJWtUu7KcQJWLsjWfJyg07wnGugja-2H39AA",
    ],
  },
  iss: "did:ethr:0x6efedeaec20e79071251fffa655F1bdDCa65c027",
};

const vcDecode = {
  iat: 1591021117,
  sub: "did:ethr:0x6efedeaec20e79071251fffa655F1bdDCa65c027",
  nbf: 1591021115,
  vc: {
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://www.w3.org/2018/credentials/examples/v1",
    ],
    id: "did:ethr:0xe0b1833c7032aAc1B8d4661aF9295623F40fc956",
    type: ["VerifiableCredential", "TexasNotaryCredential"],
    issuer: {
      id: "did:ethr:0x2a6F1D5083fb19b9f2C653B598abCb5705eD0439",
      ensDomain: "mypass.eth",
      notaryId: 12345,
      notaryPublicKey:
        "-----BEGIN RSA PUBLIC KEY-----\nMIGJAoGBAJxgZCDrhIhZPOgGKt3LaAA1/hVwlsPotX5csgDPFxifKpR75ta2Ye1V\n/yYcrL8YXi5G4RoGvT0S3nnIg5aBbNQXXGiFYS+mXaQAgGCpagvEaZAKi7ZHF1OY\nAlK/AZ9WZhsd8uq9eh1lj3/izecOPOV3teTQfsFFOnrJqh+FijfPAgMBAAE=\n-----END RSA PUBLIC KEY-----",
    },
    issuanceDate: 1591021115328,
    expirationDate: "2021-06-01T14:18:03.000Z",
    credentialSubject: {
      id: "did:ethr:0x6efedeaec20e79071251fffa655F1bdDCa65c027",
      ensDomain: "mypass.eth",
      TexasDigitalNotary: {
        type: "certifiedCopy",
        signedDocumentHash:
          "Qcu7zETlvSIaECmnx3f1mBvSXCt9xeF8r0Ton0HTme1ft33LLPs8DobZZMqnKXcai/VvbS6M//OGY2+FDcVzOGjvWyXI0vItzWDDxFKPgXbPJg3u3Dsyd2IQDL3OiHO1uKnY2fBaLjA1sj4G7qPlR2AZzcKRxz6qnX7fCEaaudc=",
        hashType: "MD5",
      },
    },
  },
  iss: "did:ethr:0x2a6F1D5083fb19b9f2C653B598abCb5705eD0439",
};
