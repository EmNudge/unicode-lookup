import { onMount, Show } from "solid-js";
import { css } from "solid-styled";
import { hasFirstLoadedSig, selectedCodepointSig, searchModeSig, resultsSig } from "$stores";

import { GitHubIcon } from "$icons/github";
import { ResultsContainer } from "$components/table-container/ResultsContainer";
import { EasySearch } from "$components/EasySearch";
import { Header } from "$components/Header";
import { AdvancedSearch } from "$components/advanced-search/AdvancedSearch";
import { Loader } from "$components/Loader";
import { InfoContainer } from "$components/table-container/InfoContainer";

export default function App() {
  onMount(() => {
    import("./queryProxy");
  });

  css`
    :global(body) {
      overflow-y: scroll;
    }
    main {
      text-align: center;
      margin: 0 auto;
      width: 600px;
      max-width: 100%;
    }
    @media (min-width: 640px) {
      main {
        max-width: none;
      }
    }
    .content.middle {
      display: grid;
      grid-template-columns: minmax(500px, auto) 600px 500px;
      justify-content: center;
    }
    @media (max-width: 1600px) {
      .content.middle {
        display: grid;
        grid-template-columns: minmax(500px, auto) 600px;
      }
    }
    aside div {
      position: fixed;
      width: 400px;
      overflow-y: auto;
      height: 100vh;
    }
  `;

  return (
    <>
      <div class={`content ${selectedCodepointSig() ? "middle" : ""}`}>
        <Show when={selectedCodepointSig()}>
          <aside>
            <div>
              <InfoContainer
                codepoint={selectedCodepointSig()!.codepoint}
                info={selectedCodepointSig()!}
                name={selectedCodepointSig()!.label}
              />
            </div>
          </aside>
        </Show>
        <div>
          <Header />
          <GitHubIcon href="https://github.com/EmNudge/unicode-lookup" />

          <main>
            <div class="searchbox">
              <Show when={searchModeSig() === "simple"} fallback={<AdvancedSearch />}>
                <EasySearch />
              </Show>
            </div>

            <br />

            <Show when={hasFirstLoadedSig()} fallback={<Loader />}>
              <Show
                when={resultsSig().length}
                fallback={
                  <>
                    <br />
                    <p>No results fit that query :/</p>
                  </>
                }
              >
                <ResultsContainer />
              </Show>
            </Show>
          </main>
        </div>
        <Show when={selectedCodepointSig()}>
          <aside />
        </Show>
      </div>
    </>
  );
}
