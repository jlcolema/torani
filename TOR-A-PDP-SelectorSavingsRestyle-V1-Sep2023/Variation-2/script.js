/* Variation 2 */
function selectorSavingsRestyleTest() {
  var waitForElements = setInterval(() => {
    const pageContainer = document.querySelector('.variant-wrapper'); // Select Target Element Here
    if (pageContainer) {
      window.ranSelectorSavingsRestyleTest = true;
      clearInterval(waitForElements);
      // Scope CSS
      document.body.classList.add('ti12');
      // Add Test Functions Here
      selectorSavingsRestyleUPDATE(); // Rename
    }
  }, 100);
}
function selectorSavingsRestyleUPDATE() {
  /* Breadcrumbs */
  // Move breadcrumbs outside of `.page-content` to display at full-width.
  const breadcrumbs = document.querySelector('.breadcrumb');
  const pageContent = document.querySelector('.page-content');
  if (breadcrumbs) {
    pageContent.parentNode.insertBefore(breadcrumbs, pageContent);
  }
  /* Product Description */
  // Move product description to be above the ingredients.
  const productAttributes = document.querySelector('.product_attributes');
  const productDescription = document.querySelector('.product-block.hide-on-mobile');
  const ingredientsContent = document.querySelector('.ingredientscont');
  // Create a container to group the description and ingredients.
  const productAttributesGroup = document.createElement('div');
  productAttributesGroup.classList.add('product_attributes__group');
  // Add the container to the attributes section.
  if (productAttributes) {
    productAttributes.insertBefore(productAttributesGroup, productAttributes.firstChild);
  }
  // Move the description inside the new container.
  if (productDescription) {
    productDescription.classList.add('descriptioncont');
    productDescription.classList.remove('product-block', 'hide-on-mobile');
    const productDescriptionTitle = document.createElement('h2');
    productDescriptionTitle.innerHTML = 'Product Description';
    productDescription.insertBefore(productDescriptionTitle, productDescription.firstChild);
    productAttributesGroup.appendChild(productDescription);
  }
  // Move the ingredients inside the new container.
  if (ingredientsContent) {
    productAttributesGroup.appendChild(ingredientsContent);
  }

  // Make sure "In Stock" is only displaying once
  function handleRadioClick(event) {
    const variantId = event.target.getAttribute('data-variant-id');
    const inventoryStatusContainer = document.querySelector('#product_inventory_status');

    if (inventoryStatusContainer) {
      // Hide all children
      Array.from(inventoryStatusContainer.children).forEach(child => {
        child.style.display = 'none';
      });

      // Show the relevant inventory status
      const relevantInventoryStatus = inventoryStatusContainer.querySelector(`#product_inventory_status_${variantId}`);
      if (relevantInventoryStatus) {
        relevantInventoryStatus.style.display = 'block';
      }
    }
  }

  // Add event listeners to radio inputs
  const newRadioInputs = document.querySelectorAll('input[type="radio"][data-variant-id]');
  newRadioInputs.forEach(input => {
    input.addEventListener('click', handleRadioClick);
  });
}
try {
  if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
    selectorSavingsRestyleTest();
  } else {
    document.addEventListener('DOMContentLoaded', selectorSavingsRestyleTest);
  }
} catch (err) {
  const e = {
    dev: 'U05C4LLSK6G',
    vwotest: '12',
    vwodesc: 'TOR-A-PDP-SelectorSavingsRestyle-V1-Sep2023 - Variation 2',
    type: 'vwo',
    message: err.toString(),
    stack: err.stack,
    source: window.location.href
  };
  const x = new XMLHttpRequest();
  x.open('POST', 'https://us-central1-tixray.cloudfunctions.net/err', !0), x.send(JSON.stringify(e));
}
