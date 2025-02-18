<script lang="ts">
  const { properties }: { properties: string[] } = $props();
</script>

<h3>Properties</h3>
<div class="properties">
  {#each properties as property}
    <span>{property}</span>
  {/each}
</div>

<style>
  h3 {
    padding-bottom: 6px;
    color: var(--primary-text);
    font-size: 1rem;
    font-weight: 400;
  }
  
  .properties {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
		gap: 5px;
    text-align: left;    
  }
  .properties span {
    background: var(--bg-offset);
    padding: 2px 8px;
    border-radius: 4px;
  }
</style>